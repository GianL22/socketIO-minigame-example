import { ErrorHandler } from "../../../../../core/application/decorators/error_handler.decorator";
import { LoggerDecorator } from "../../../../../core/application/decorators/logger.decorator";
import { eventMediator } from "../../../../../core/infraestructure/event-mediator/event-mediator";
import { NodeLogger } from "../../../../../core/infraestructure/logger/node.logger";
import { SocketIO } from "../../../../../core/infraestructure/socketio/socketio.socket";
import { JoinPlayerToRoomCommand } from "../../../../application/commands/join-player/join-player.command";
import { JoinPlayerToRoomDTO } from "../../../../application/commands/join-player/types/dto";
import { RoomJSONRespository } from "../../../respository/room.json.responsitory";

export class JoinPlayerToRoomController{

    constructor( private socket : SocketIO){}
    
    execute(data : JoinPlayerToRoomDTO){
        new LoggerDecorator(
            new ErrorHandler(
                new JoinPlayerToRoomCommand(
                    this.socket,
                    eventMediator,
                    new RoomJSONRespository('./'),
                ),
            ),
            new NodeLogger(),
            'JOIN_PLAYER_ROOM'
        ).execute(
            data
        )

    }

}