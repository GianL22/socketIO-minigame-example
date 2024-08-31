import { ErrorHandler } from "../../../../../core/application/decorators/error_handler.decorator";
import { LoggerDecorator } from "../../../../../core/application/decorators/logger.decorator";
import { eventMediator } from "../../../../../core/infraestructure/event-mediator/event-mediator";
import { NodeLogger } from "../../../../../core/infraestructure/logger/node.logger";
import { matchRepository } from "../../../repositories/match-memory.repository";
import { SelectPlayerWithoutCaseDTO } from '../../../../application/command/select-player-without-case/types/dto';
import { SelectPlayerWithoutCaseCommand } from "../../../../application/command/select-player-without-case/select-player-without-case.command";

export class SelectPlayerWithoutCaseController{

    execute(data : SelectPlayerWithoutCaseDTO){
        new LoggerDecorator(
            new ErrorHandler(
                new SelectPlayerWithoutCaseCommand(
                    eventMediator,
                    matchRepository
                ),
            ),
            new NodeLogger(),
            'SELECT_PLAYER_WITHOUT_CASE'
        ).execute(
            data
        )

    }

}