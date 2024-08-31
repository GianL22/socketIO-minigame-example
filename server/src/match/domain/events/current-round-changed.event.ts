import { Event } from "../../../core/domain/event/event"

export const CURRENT_ROUND_CHANGED = 'CURRENT_ROUND_CHANGED'
export const currentRoundChanged = (roomId : string, matchId: string) => 
        Event.create(
            CURRENT_ROUND_CHANGED, 
            {
                roomId,
                matchId,
            },
            new Date()
        )   