import { ErrorHandler } from "../../../../../core/application/decorators/error_handler.decorator";
import { LoggerDecorator } from "../../../../../core/application/decorators/logger.decorator";
import { eventMediator } from "../../../../../core/infraestructure/event-mediator/event-mediator";
import { NodeLogger } from "../../../../../core/infraestructure/logger/node.logger";
import { matchRepository } from "../../../repositories/match-memory.repository";
import { StealCaseDTO } from "../../../../application/command/steal-case/types/dto";
import { StealCaseCommand } from '../../../../application/command/steal-case/steal-case.command';
import { KeepCaseDTO } from "../../../../application/command/keep-case/types/dto";
import { KeepCaseCommand } from "../../../../application/command/keep-case/keep-case.command";

export class KeepCaseController{

    
    execute(data : KeepCaseDTO){
        new LoggerDecorator(
            new ErrorHandler(
                new KeepCaseCommand(
                    eventMediator,
                    matchRepository
                ),
            ),
            new NodeLogger(),
            'CASE_KEEP'
        ).execute(
            data
        )

    }

}