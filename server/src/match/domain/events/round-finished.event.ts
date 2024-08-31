import { Event } from "../../../core/domain/event/event"

export const ROUND_FINISHED = 'ROUND_FINISHED'
export const roundFinished = (roomId : string, matchId : string) => 
        Event.create(
            ROUND_FINISHED, 
            {
                matchId,
                roomId, 
            },
            new Date()
        )   