import { ErrorHandler } from "../../../../../core/application/decorators/error_handler.decorator";
import { LoggerDecorator } from "../../../../../core/application/decorators/logger.decorator";
import { eventMediator } from "../../../../../core/infraestructure/event-mediator/event-mediator";
import { NodeLogger } from "../../../../../core/infraestructure/logger/node.logger";
import { matchRepository } from "../../../repositories/match-memory.repository";
import { StealCaseDTO } from "../../../../application/command/steal-case/types/dto";
import { StealCaseCommand } from '../../../../application/command/steal-case/steal-case.command';

export class StealCaseController{

    
    execute(data : StealCaseDTO){
        new LoggerDecorator(
            new ErrorHandler(
                new StealCaseCommand(
                    eventMediator,
                    matchRepository
                ),
            ),
            new NodeLogger(),
            'STOLE_CASE'
        ).execute(
            data
        )

    }

}