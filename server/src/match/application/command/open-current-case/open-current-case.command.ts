import { ApplicationService } from "../../../../core/application/service/application.service";
import { EventMediator } from "../../../../core/infraestructure/event-mediator/event-mediator";
import { Result } from "../../../../utils/result";
import { MatchRepository } from "../../repositories/match.repository";
import { OpenCurrentCaseDTO } from "./types/dto";
import { OpenCurrentCaseResponse } from "./types/response";

export class OpenCurrentCaseCommand implements ApplicationService<OpenCurrentCaseDTO, OpenCurrentCaseResponse>{

    constructor(
        //TODO: Poner puerto, contaminacion OJO
        private eventMediator : EventMediator,
        private matchRepository : MatchRepository,
    ){}

    async execute(data: OpenCurrentCaseDTO): Promise<Result<OpenCurrentCaseResponse>> {
        
        const matchOpt = await this.matchRepository.findById(data.matchId)
        if ( !matchOpt.hasValue() ) throw new Error('Match doesnt exist');
        const match = matchOpt.value;

        const currentCase = match.openRoundCurrentCase()

        await this.matchRepository.save(match)
        this.eventMediator.publish(match.pullEvents())
        return Result.makeSuccessful({
            roomId : match.roomId,
            caseId : currentCase.id,
            isSafe : currentCase.isSafe
        })
    }

}
