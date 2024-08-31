import { ApplicationService } from "../../../../core/application/service/application.service";
import { EventMediator } from "../../../../core/infraestructure/event-mediator/event-mediator";
import { Result } from "../../../../utils/result";
import { Round } from "../../../domain/round";
import { CalculateRemainPlayersService } from "../../../domain/services/calculate-remain-players.service";
import { GenerateMatchSafeCases } from "../../../domain/services/generate-cases.service";
import { SelectFirstWithCasePlayer } from "../../../domain/services/select-first-with-case-player.service";
import { MatchRepository } from "../../repositories/match.repository";
import { SelectPlayerWithoutCaseCommand } from "../select-player-without-case/select-player-without-case.command";
import { PassToNextRoundDTO } from "./types/dto";
import { PassToNextRoundResponse } from "./types/response";


export class PassToNextRoundCommand implements ApplicationService<PassToNextRoundDTO, PassToNextRoundResponse>{

    
    constructor(
        //TODO: Poner puerto, contaminacion OJO
        private eventMediator : EventMediator,
        private matchRepository : MatchRepository
    ){}

    async execute(data: PassToNextRoundDTO): Promise<Result<PassToNextRoundResponse>> {
        const matchOpt = await this.matchRepository.findById(data.matchId)
        if ( !matchOpt.hasValue() ) throw new Error('Room doesnt exist');
        const match = matchOpt.value;


        const service = new CalculateRemainPlayersService()
        const remainPlayers = service.calculate(match.remain, match.eliminatedPlayers)

        const firstCasePlayerService = new SelectFirstWithCasePlayer()
        const firstPlayerWithCase = firstCasePlayerService.select(remainPlayers)

        const cases = new GenerateMatchSafeCases().generate(remainPlayers)

        match.passToNextRun(firstPlayerWithCase, cases)
        
        await this.matchRepository.save(match)
        this.eventMediator.publish(match.pullEvents())
        return Result.makeSuccessful({
            matchId : match.id
        })
    }

}
