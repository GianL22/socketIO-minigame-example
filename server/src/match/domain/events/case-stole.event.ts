import { Event } from "../../../core/domain/event/event"

export const CASE_STOLE = 'CASE_STOLE'
export const caseStole = (roomId : string, matchId: string, caseId : string, playerId : string) => 
        Event.create(
            CASE_STOLE, 
            {
                roomId,
                matchId,
                caseId, 
                playerId, 
            },
            new Date()
        )   