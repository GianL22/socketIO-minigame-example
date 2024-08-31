import { Event } from "../../../core/domain/event/event"

export const PLAYER_WITH_CASE_CHANGED = 'PLAYER_WITH_CASE_CHANGED'
export const playerWithCaseChanged = (matchId: string, playerId : string) => 
        Event.create(
            PLAYER_WITH_CASE_CHANGED, 
            {
                matchId,
                playerId
            },
            new Date()
        )   