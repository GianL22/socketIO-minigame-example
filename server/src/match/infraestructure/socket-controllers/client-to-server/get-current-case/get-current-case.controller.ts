import { ErrorHandler } from "../../../../../core/application/decorators/error_handler.decorator";
import { LoggerDecorator } from "../../../../../core/application/decorators/logger.decorator";
import { NodeLogger } from "../../../../../core/infraestructure/logger/node.logger";
import { matchRepository } from "../../../repositories/match-memory.repository";
import { GetCurrentCaseDTO } from "../../../../application/querys/get-current-case/types/dto";
import { GetCurrentCaseQuery } from '../../../../application/querys/get-current-case/get-current-case.query';
import { GetCurrentCaseResponse } from "../../../../application/querys/get-current-case/types/response";

export class GetCurrentCaseController{

    async execute(data : GetCurrentCaseDTO): Promise<GetCurrentCaseResponse>{
        const result = await new LoggerDecorator(
            new ErrorHandler(
                new GetCurrentCaseQuery(
                    matchRepository
                ),
            ),
            new NodeLogger(),
            'CURRENT_CASE'
        ).execute(
            data
        )
        if ( result.isSuccessful() ) return result.value;
        throw result.error;
    }

}