import { Event } from "../../../core/domain/event/event"

export const CURRENT_CASE_PEEKED = 'CURRENT_CASE_PEEKED'
export const currentCasePeeked = (roomId : string, matchId: string, playerId : string, playerName: string, caseId : string, isSafe : boolean) => 
        Event.create(
            CURRENT_CASE_PEEKED, 
            {
                roomId,
                matchId,
                playerId,
                playerName, 
                caseId,
                isSafe,
            },
            new Date()
        )   