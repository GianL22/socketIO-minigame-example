import { Event } from "../../../core/domain/event/event"

export const DUEL_FINISHED = 'DUEL_FINISHED'
export const duelFinished = (roomId : string, matchId : string) => 
        Event.create(
            DUEL_FINISHED, 
            {
                matchId,
                roomId, 
            },
            new Date()
        )   