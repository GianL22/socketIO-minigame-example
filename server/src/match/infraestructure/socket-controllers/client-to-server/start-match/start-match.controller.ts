import { ErrorHandler } from "../../../../../core/application/decorators/error_handler.decorator";
import { LoggerDecorator } from "../../../../../core/application/decorators/logger.decorator";
import { eventMediator } from "../../../../../core/infraestructure/event-mediator/event-mediator";
import { NodeLogger } from "../../../../../core/infraestructure/logger/node.logger";
import { StartMatchDTO } from "../../../../application/command/start-match/types/dto";
import { StartMatchCommand } from '../../../../application/command/start-match/start-match.command';
import { MatchMemoryRepository, matchRepository } from "../../../repositories/match-memory.repository";
import { UUIDGenerator } from "../../../../../core/infraestructure/uuid/uuid.generator";
import { RoomJSONRespository } from "../../../../../room/infraestructure/respository/room.json.responsitory";

export class StartMatchController{

    
    execute(data : StartMatchDTO){
        new LoggerDecorator(
            new ErrorHandler(
                new StartMatchCommand(
                    new UUIDGenerator(),
                    eventMediator,
                    new RoomJSONRespository('./'),
                    matchRepository
                ),
            ),
            new NodeLogger(),
            'START_MATCH'
        ).execute(
            data
        )

    }

}