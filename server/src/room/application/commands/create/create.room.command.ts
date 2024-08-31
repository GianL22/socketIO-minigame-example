import { CreateRoomDTO } from "./types/dto";
import { CreateRoomResponse } from "./types/response";
import { RoomRepository } from '../../respositories/room.respository';
import { ApplicationService } from "../../../../core/application/service/application.service";
import { Result } from "../../../../utils/result";
import { Room } from "../../../domain/room";


export class CreateRoomCommand implements ApplicationService<CreateRoomDTO, CreateRoomResponse>{

    constructor(
        private roomRepository : RoomRepository
    ){}

    async execute(data: CreateRoomDTO): Promise<Result<CreateRoomResponse>> {
        const roomOpt = await this.roomRepository.findById(data.id)
        if ( roomOpt.hasValue() ) throw new Error('Room already Exists')
        const newRoom = new Room(data.id, [])
        this.roomRepository.save(newRoom)
        return Result.makeSuccessful({
            id: newRoom.id
        })
    }

}