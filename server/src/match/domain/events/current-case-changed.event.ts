import { Event } from "../../../core/domain/event/event"

export const CURRENT_CASE_CHANGED = 'CURRENT_CASE_CHANGED'
export const currentCaseChanged = (roomId : string, matchId: string, caseId : string) => 
        Event.create(
            CURRENT_CASE_CHANGED, 
            {
                roomId,
                matchId,
                caseId, 
            },
            new Date()
        )   