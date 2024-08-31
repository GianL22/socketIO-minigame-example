import { ApplicationService } from "../../../../core/application/service/application.service";
import { EventMediator } from "../../../../core/infraestructure/event-mediator/event-mediator";
import { Result } from "../../../../utils/result";
import { MatchRepository } from "../../repositories/match.repository";
import { SelectPlayerWithoutCaseDTO } from "./types/dto";
import { SelectPlayerWithoutCaseResponse } from "./types/response";

export class SelectPlayerWithoutCaseCommand implements ApplicationService<SelectPlayerWithoutCaseDTO,SelectPlayerWithoutCaseResponse>{

    constructor(
        //TODO: Poner puerto, contaminacion OJO
        private eventMediator : EventMediator,
        private matchRepository : MatchRepository
    ){}

    async execute(data: SelectPlayerWithoutCaseDTO): Promise<Result<SelectPlayerWithoutCaseResponse>> {
        
        const matchOpt = await this.matchRepository.findById(data.matchId)
        if ( !matchOpt.hasValue() ) throw new Error('Match doesnt exist');
        const match = matchOpt.value;
        match.selectRoundPlayerWithoutCase(data.playerWithoutCaseId);
        await this.matchRepository.save(match)
        this.eventMediator.publish(match.pullEvents())
        return Result.makeSuccessful({
            playerId : match.playerWithoutCase.id
        })
    }

}
