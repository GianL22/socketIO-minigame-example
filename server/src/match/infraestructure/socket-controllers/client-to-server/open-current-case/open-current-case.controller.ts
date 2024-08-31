import { ErrorHandler } from "../../../../../core/application/decorators/error_handler.decorator";
import { LoggerDecorator } from "../../../../../core/application/decorators/logger.decorator";
import { eventMediator } from "../../../../../core/infraestructure/event-mediator/event-mediator";
import { NodeLogger } from "../../../../../core/infraestructure/logger/node.logger";
import { matchRepository } from "../../../repositories/match-memory.repository";
import { OpenCurrentCaseDTO } from "../../../../application/command/open-current-case/types/dto";
import { OpenCurrentCaseCommand } from "../../../../application/command/open-current-case/open-current-case.command";
import { OpenCurrentCaseResponse } from "../../../../application/command/open-current-case/types/response";

export class OpenCurrentCaseController{

    
    async execute(data : OpenCurrentCaseDTO) : Promise<OpenCurrentCaseResponse>{
        const result = await new LoggerDecorator(
            new ErrorHandler(
                new OpenCurrentCaseCommand(
                    eventMediator,
                    matchRepository
                ),
            ),
            new NodeLogger(),
            'OPEN_CURRENT_CASE'
        ).execute(
            data
        )
        return result.value
    }

}