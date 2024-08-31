import { Event } from "../../../core/domain/event/event";
export const PLAYER_LEAVED = 'PLAYER_LEAVED'
export const playerLeaved = (playerId : string, roomId : string) => 
        Event.create(
            PLAYER_LEAVED, 
            {
                playerId,
                roomId
            },
            new Date()
        )   