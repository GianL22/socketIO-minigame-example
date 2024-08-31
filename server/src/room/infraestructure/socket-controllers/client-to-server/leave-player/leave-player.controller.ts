import { ErrorHandler } from "../../../../../core/application/decorators/error_handler.decorator";
import { LoggerDecorator } from "../../../../../core/application/decorators/logger.decorator";
import { eventMediator } from "../../../../../core/infraestructure/event-mediator/event-mediator";
import { NodeLogger } from "../../../../../core/infraestructure/logger/node.logger";
import { SocketIO } from "../../../../../core/infraestructure/socketio/socketio.socket";
import { LeavePLayerCommand } from "../../../../application/commands/leave-palyer/leave-player.command";
import { LeavePlayerDTO } from "../../../../application/commands/leave-palyer/types/dto";
import { RoomJSONRespository } from "../../../respository/room.json.responsitory";

export class LeavePlayerFromRoomController{

    constructor( private socket : SocketIO){}
    
    execute(data : LeavePlayerDTO){
        new LoggerDecorator(
            new ErrorHandler(
                new LeavePLayerCommand(
                    this.socket,
                    eventMediator,
                    new RoomJSONRespository('./'),
                ),
            ),
            new NodeLogger(),
            'LEAVE_PLAYER_ROOM'
        ).execute(
            data
        )

    }

}