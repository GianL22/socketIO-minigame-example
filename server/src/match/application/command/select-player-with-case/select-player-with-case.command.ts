import { ApplicationService } from "../../../../core/application/service/application.service";
import { EventMediator } from "../../../../core/infraestructure/event-mediator/event-mediator";
import { Result } from "../../../../utils/result";
import { MatchRepository } from "../../repositories/match.repository";
import { SelectPlayerWithCaseDTO } from "./types/dto";
import { SelectPlayerWithCaseResponse } from "./types/response";

export class SelectPlayerWithCaseCommand implements ApplicationService<SelectPlayerWithCaseDTO,SelectPlayerWithCaseResponse>{

    constructor(
        //TODO: Poner puerto, contaminacion OJO
        private eventMediator : EventMediator,
        private matchRepository : MatchRepository
    ){}

    async execute(data: SelectPlayerWithCaseDTO): Promise<Result<SelectPlayerWithCaseResponse>> {
        const matchOpt = await this.matchRepository.findById(data.matchId)
        if ( !matchOpt.hasValue() ) throw new Error('Match doesnt exist');
        const match = matchOpt.value;
        
        await this.matchRepository.save(match)
        this.eventMediator.publish(match.pullEvents())
        return Result.makeSuccessful({
            matchId : match.id,
            playerId : match.playerWithCase.id
        })
    }

}
