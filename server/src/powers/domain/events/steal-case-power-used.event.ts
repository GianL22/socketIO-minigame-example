import { Event } from "../../../core/domain/event/event"

export const STEAL_CASE_POWER_USED = 'STEAL_CASE_POWER_USED'
export const stealCasePowerUsed = (roomId : string, matchId: string, playerId : string, playerName: string, playerColor : string) => 
        Event.create(
            STEAL_CASE_POWER_USED, 
            {
                roomId,
                matchId,
                playerId, 
                playerName, 
                playerColor,
            },
            new Date()
        )   