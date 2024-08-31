import { Event } from "../../../core/domain/event/event"

export const PALYER_SAFED = 'PALYER_SAFED'
export const playerSafed = (matchId: string, playerId : string) => 
        Event.create(
            PALYER_SAFED, 
            {
                matchId,
                playerId
            },
            new Date()
        )   