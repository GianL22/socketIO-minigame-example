import { Event } from "../../../core/domain/event/event"

export const MATCH_STARTED = 'MATCH_STARTED'
export const matchStarted = (matchId: string, roomId : string) => 
        Event.create(
            MATCH_STARTED, 
            {
                matchId,
                roomId, 
            },
            new Date()
        )   