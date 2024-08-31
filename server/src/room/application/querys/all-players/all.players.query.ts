import { RoomRepository } from '../../respositories/room.respository';
import { ApplicationService } from "../../../../core/application/service/application.service";
import { Result } from "../../../../utils/result";
import { AllPlayersDTO } from './types/dto';
import { Room } from "../../../domain/room";
import { AllPlayersResponse } from './types/All.players.response';


export class AllPlayersQuery implements ApplicationService<AllPlayersDTO, AllPlayersResponse[]>{

    constructor(
        private roomRepository : RoomRepository
    ){}

    async execute(data: AllPlayersDTO): Promise<Result<AllPlayersResponse[]>> {
        const roomOpt = await this.roomRepository.findById(data.roomId)
        if ( !roomOpt.hasValue() ) throw new Error('Room doesnt exists')
        const players = roomOpt.value.players;
        const response : AllPlayersResponse[] = players.map((player) => {
            return {
                playerId : player.id,
                playerName : player.name,
                playerColor : player.color
            }
        })
        return Result.makeSuccessful(response) 
    }

}