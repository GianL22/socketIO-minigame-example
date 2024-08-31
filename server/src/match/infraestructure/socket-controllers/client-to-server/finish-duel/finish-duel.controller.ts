import { ErrorHandler } from "../../../../../core/application/decorators/error_handler.decorator";
import { LoggerDecorator } from "../../../../../core/application/decorators/logger.decorator";
import { eventMediator } from "../../../../../core/infraestructure/event-mediator/event-mediator";
import { NodeLogger } from "../../../../../core/infraestructure/logger/node.logger";
import { FinishDuelCommand } from "../../../../application/command/finish-duel/finish-duel.command";
import { FinishDuelDTO } from "../../../../application/command/finish-duel/types/dto";
import { FinishDuelResponse } from "../../../../application/command/finish-duel/types/response";
import { matchRepository } from "../../../repositories/match-memory.repository";

export class FinishDuelController{

    async execute(data : FinishDuelDTO): Promise<FinishDuelResponse>{
        const result = await new LoggerDecorator(
            new ErrorHandler(
                new FinishDuelCommand(
                    eventMediator,
                    matchRepository,
                ),
            ),
            new NodeLogger(),
            'FINISH_DUEL'
        ).execute(
            data
        )
        if ( result.isSuccessful() ) return result.value;
        throw result.error;
    }

}