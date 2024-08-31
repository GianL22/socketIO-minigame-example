import { Event } from "../../../core/domain/event/event"

export const CHANGE_ISSAFE_USED = 'CHANGE_ISSAFE_USED'
export const changeIsSafeUsed = (roomId : string, matchId: string, playerId : string, playerName: string) => 
        Event.create(
            CHANGE_ISSAFE_USED, 
            {
                roomId,
                matchId,
                playerId, 
                playerName, 
            },
            new Date()
        )   