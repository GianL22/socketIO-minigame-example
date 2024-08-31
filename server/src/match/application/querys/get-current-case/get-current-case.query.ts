import { ApplicationService } from "../../../../core/application/service/application.service";
import { Result } from "../../../../utils/result";
import { MatchRepository } from "../../repositories/match.repository";
import { GetCurrentCaseDTO } from "./types/dto";
import { GetCurrentCaseResponse } from "./types/response";

export class GetCurrentCaseQuery implements ApplicationService<GetCurrentCaseDTO, GetCurrentCaseResponse>{
    
    constructor(
        private matchRepository : MatchRepository
    ){}

    async execute(data: GetCurrentCaseDTO): Promise<Result<GetCurrentCaseResponse>> {
        const matchOpt = await this.matchRepository.findById(data.matchId)
        if ( !matchOpt.hasValue() ) throw new Error('match doesnt exist');
        const match = matchOpt.value;
        return Result.makeSuccessful({
            roomId : match.roomId,
            caseId : match.currentCase.id,
            isSafe : match.currentCase.isSafe,
        })        

    }

}
