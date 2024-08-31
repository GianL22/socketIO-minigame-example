import { ErrorHandler } from "../../../../../core/application/decorators/error_handler.decorator";
import { LoggerDecorator } from "../../../../../core/application/decorators/logger.decorator";
import { eventMediator } from "../../../../../core/infraestructure/event-mediator/event-mediator";
import { NodeLogger } from "../../../../../core/infraestructure/logger/node.logger";
import { matchRepository } from "../../../repositories/match-memory.repository";
import { SelectCaseDTO } from '../../../../application/command/select-case/types/dto';
import { SelectCaseCommand } from "../../../../application/command/select-case/select-case.command";

export class SelectCaseController{

    execute(data : SelectCaseDTO){
        new LoggerDecorator(
            new ErrorHandler(
                new SelectCaseCommand(
                    eventMediator,
                    matchRepository
                ),
            ),
            new NodeLogger(),
            'SELECT_CASE'
        ).execute(
            data
        )

    }

}