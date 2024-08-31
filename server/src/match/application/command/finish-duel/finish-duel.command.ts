import { ApplicationService } from "../../../../core/application/service/application.service";
import { EventMediator } from "../../../../core/infraestructure/event-mediator/event-mediator";
import { Result } from "../../../../utils/result";
import { EstablishDuelWinnerService } from "../../../domain/services/establish-duel-winner.service";
import { MatchRepository } from "../../repositories/match.repository";
import { FinishDuelDTO } from "./types/dto";
import { FinishDuelResponse } from "./types/response";


export class FinishDuelCommand implements ApplicationService<FinishDuelDTO, FinishDuelResponse>{

    
    constructor(
        //TODO: Poner puerto, contaminacion OJO
        private eventMediator : EventMediator,
        private matchRepository : MatchRepository
    ){}

    async execute(data: FinishDuelDTO): Promise<Result<FinishDuelResponse>> {
        const matchOpt = await this.matchRepository.findById(data.matchId)
        if ( !matchOpt.hasValue() ) throw new Error('Room doesnt exist');
        const match = matchOpt.value;

        const service = new EstablishDuelWinnerService()
        service.establish(match)
        match.checkMatchStatus()
        match.swapPlayers()

        await this.matchRepository.save(match)
        this.eventMediator.publish(match.pullEvents())
        return Result.makeSuccessful({
            matchId : match.id,
            safedPlayers : match.safedPlayers.map(p => {
                return {id : p.id, name : p.name, color : p.color }
            }),
            eliminatedPlayers : match.eliminatedPlayers.map(p => {
                return {id : p.id, name : p.name, color : p.color }
            }),
        })
    }

}
