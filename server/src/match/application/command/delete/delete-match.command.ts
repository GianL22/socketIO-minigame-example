import { ApplicationService } from "../../../../core/application/service/application.service";
import { EventMediator } from "../../../../core/infraestructure/event-mediator/event-mediator";
import { Result } from "../../../../utils/result";
import { MatchRepository } from "../../repositories/match.repository";
import { DeleteMatchDTO } from "./types/dto";
import { DeleteMatchResponse } from "./types/response";

export class DeleteMatchCommand implements ApplicationService<DeleteMatchDTO, DeleteMatchResponse>{

    constructor(
        //TODO: Poner puerto, contaminacion OJO
        private eventMediator : EventMediator,
        private matchRepository : MatchRepository,
    ){}

    async execute(data: DeleteMatchDTO): Promise<Result<DeleteMatchResponse>> {
        
        const matchOpt = await this.matchRepository.findById(data.matchId)
        if ( !matchOpt.hasValue() ) throw new Error('Match doesnt exist');
        const match = matchOpt.value;
        await this.matchRepository.delete(match.id)
        
        this.eventMediator.publish(match.pullEvents())
        return Result.makeSuccessful({
            matchId : match.id,
        })
    }

}
