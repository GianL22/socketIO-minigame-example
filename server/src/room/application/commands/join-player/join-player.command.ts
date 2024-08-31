import { IdGenerator } from "../../../../core/application/id-generator/id.generator";
import { ApplicationService } from "../../../../core/application/service/application.service";
import { ISocket } from "../../../../core/application/socket/ISocket";
import { EventMediator } from "../../../../core/infraestructure/event-mediator/event-mediator";
import { io } from "../../../../core/server/server";
import { Result } from "../../../../utils/result";
import { PLAYER_JOINED } from "../../../domain/events/player-joined.event";
import { Player } from "../../../domain/player";
import { PlayerJoinedEventListener } from "../../../infraestructure/event-listeners/player-joined.listener";
import { RoomRepository } from "../../respositories/room.respository";
import { JoinPlayerToRoomDTO } from "./types/dto";
import { JoinPlayerResponse } from "./types/response";

export class JoinPlayerToRoomCommand implements ApplicationService<JoinPlayerToRoomDTO, JoinPlayerResponse>{

    
    constructor(
        //TODO: Poner puerto, contaminacion OJO
        private socket : ISocket,
        private eventMediator : EventMediator,
        private roomRespoitory : RoomRepository  
    ){}

    async execute(data: JoinPlayerToRoomDTO): Promise<Result<JoinPlayerResponse>> {
        const roomOpt = await this.roomRespoitory.findById(data.roomId)
    
        if ( !roomOpt.hasValue() ) throw new Error('Room doesnt exist')
        const room = roomOpt.value
        
        room.joinPlayer(
            new Player(
                data.playerId,
                data.playerName,
                data.playerColor,
            )
        )

        await this.roomRespoitory.save(room)
        this.socket.join(room.id)
        this.eventMediator.publish(room.pullEvents())
        return Result.makeSuccessful({
            id : data.playerId
        })        

    }

}
