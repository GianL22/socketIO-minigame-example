import { ApplicationService } from "../../../../core/application/service/application.service";
import { ISocket } from "../../../../core/application/socket/ISocket";
import { EventMediator } from "../../../../core/infraestructure/event-mediator/event-mediator";
import { Result } from "../../../../utils/result";
import { KeepCaseService } from "../../../domain/services/keep-case.service";
import { StealCaseService } from "../../../domain/services/steal-case.service";
import { MatchRepository } from "../../repositories/match.repository";
import { KeepCaseDTO } from "./types/dto";
import { KeepCaseResponse } from "./types/response";

export class KeepCaseCommand implements ApplicationService<KeepCaseDTO, KeepCaseResponse>{

    constructor(
        //TODO: Poner puerto, contaminacion OJO
        private eventMediator : EventMediator,
        private matchRepository : MatchRepository,
    ){}

    async execute(data: KeepCaseDTO): Promise<Result<KeepCaseResponse>> {
        
        const matchOpt = await this.matchRepository.findById(data.matchId)
        if ( !matchOpt.hasValue() ) throw new Error('Match doesnt exist');
        const match = matchOpt.value;
        
        const service = new KeepCaseService()
        service.keep(match, data.playerId)

        await this.matchRepository.save(match)
        this.eventMediator.publish(match.pullEvents())
        return Result.makeSuccessful({
            caseId : match.currentCase.id
        })
    }

}
