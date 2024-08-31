import { Event } from "../../../core/domain/event/event"

export const CASE_KEPT = 'CASE_KEPT'
export const caseKept = (roomId : string, matchId: string, caseId : string, playerId : string) => 
        Event.create(
            CASE_KEPT, 
            {
                roomId,
                matchId,
                caseId, 
                playerId, 
            },
            new Date()
        )   