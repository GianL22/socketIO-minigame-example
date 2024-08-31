import { Event } from "../../../core/domain/event/event";
export const PLAYER_JOINED = 'PLAYER_JOINED'
export const playerJoined = (playerId : string, roomId : string) => 
        Event.create(
            PLAYER_JOINED, 
            {
                playerId,
                roomId

            },
            new Date()
        )   