import { Event } from "../../../core/domain/event/event"

export const PLAYER_WITHOUT_CASE_SELECTED = 'PLAYER_WITHOUT_CASE_SELECTED'
export const playerWithoutCaseSelected = (roomId: string, matchId: string, playerId : string) => 
        Event.create(
            PLAYER_WITHOUT_CASE_SELECTED, 
            {
                roomId,
                matchId,
                playerId, 
            },
            new Date()
        )   