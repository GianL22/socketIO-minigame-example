import { ApplicationService } from "../../../../core/application/service/application.service";
import { ISocket } from "../../../../core/application/socket/ISocket";
import { EventMediator } from "../../../../core/infraestructure/event-mediator/event-mediator";
import { Result } from "../../../../utils/result";
import { StealCaseService } from "../../../domain/services/steal-case.service";
import { MatchRepository } from "../../repositories/match.repository";
import { StealCaseDTO } from "./types/dto";
import { StealCaseResponse } from "./types/response";

export class StealCaseCommand implements ApplicationService<StealCaseDTO, StealCaseResponse>{

    constructor(
        //TODO: Poner puerto, contaminacion OJO
        private eventMediator : EventMediator,
        private matchRepository : MatchRepository,
    ){}

    async execute(data: StealCaseDTO): Promise<Result<StealCaseResponse>> {
        
        const matchOpt = await this.matchRepository.findById(data.matchId)
        if ( !matchOpt.hasValue() ) throw new Error('Match doesnt exist');
        const match = matchOpt.value;
        
        const service = new StealCaseService()
        service.steal(match, data.playerId)

        await this.matchRepository.save(match)
        this.eventMediator.publish(match.pullEvents())
        return Result.makeSuccessful({
            caseId : match.currentCase.id
        })
    }

}
