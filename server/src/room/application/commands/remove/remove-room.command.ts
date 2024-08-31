import { RoomRepository } from '../../respositories/room.respository';
import { ApplicationService } from "../../../../core/application/service/application.service";
import { Result } from "../../../../utils/result";
import { Room } from "../../../domain/room";
import { RemoveRoomCommandDTO } from './types/dto';
import { RemoveRoomCommandResponse } from './types/response';


export class RemoveRoomCommand implements ApplicationService<RemoveRoomCommandDTO, RemoveRoomCommandResponse>{

    constructor(
        private roomRepository : RoomRepository
    ){}

    async execute(data: RemoveRoomCommandDTO): Promise<Result<RemoveRoomCommandResponse>> {
        const roomOpt = await this.roomRepository.findById(data.roomId)
        if ( !roomOpt.hasValue() ) {
            throw new Error('Room doesnt Exists')
        }
        const room = roomOpt.value
        this.roomRepository.deleteById(room.id)
        return Result.makeSuccessful({
            roomId: room.id
        })
    }

}