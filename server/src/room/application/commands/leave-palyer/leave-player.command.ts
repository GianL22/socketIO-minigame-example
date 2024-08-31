import { ApplicationService } from "../../../../core/application/service/application.service";
import { ISocket } from "../../../../core/application/socket/ISocket";
import { EventMediator } from "../../../../core/infraestructure/event-mediator/event-mediator";
import { Result } from "../../../../utils/result";
import { RoomRepository } from "../../respositories/room.respository";
import { LeavePlayerDTO } from "./types/dto";
import { LeavePlayerResponse } from "./types/response";

export class LeavePLayerCommand implements ApplicationService<LeavePlayerDTO, LeavePlayerResponse>{

    constructor(
        //TODO: Poner puerto, contaminacion OJO
        private socket : ISocket,
        private eventMediator : EventMediator,
        private roomRespoitory : RoomRepository  
    ){}

    async execute(data: LeavePlayerDTO): Promise<Result<LeavePlayerResponse>> {
        const roomOpt = await this.roomRespoitory.findById(data.roomId)

        if ( !roomOpt.hasValue() ) throw new Error('Room doesnt exist')
        const room = roomOpt.value
    
        room.leavePlayer(data.playerId)
        
        await this.roomRespoitory.save(room)
        this.socket.leave(room.id)
        this.eventMediator.publish(room.pullEvents())
        return Result.makeSuccessful({
            playerId : data.playerId
        })        

    }

}