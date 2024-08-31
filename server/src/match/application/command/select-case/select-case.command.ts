import { ApplicationService } from "../../../../core/application/service/application.service";
import { EventMediator } from "../../../../core/infraestructure/event-mediator/event-mediator";
import { Result } from "../../../../utils/result";
import { MatchRepository } from "../../repositories/match.repository";
import { SelectCaseDTO } from "./types/dto";
import { SelectCaseResponse } from "./types/response";

export class SelectCaseCommand implements ApplicationService<SelectCaseDTO, SelectCaseResponse>{

    constructor(
        //TODO: Poner puerto, contaminacion OJO
        private eventMediator : EventMediator,
        private matchRepository : MatchRepository
    ){}

    async execute(data: SelectCaseDTO): Promise<Result<SelectCaseResponse>> {
        
        const matchOpt = await this.matchRepository.findById(data.matchId)
        if ( !matchOpt.hasValue() ) throw new Error('Match doesnt exist');
        const match = matchOpt.value;
        match.selectCase(data.caseId)
        await this.matchRepository.save(match)
        this.eventMediator.publish(match.pullEvents())
        return Result.makeSuccessful({
            caseId : match.currentCase.id
        })
    }

}
