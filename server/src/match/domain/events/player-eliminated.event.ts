import { Event } from "../../../core/domain/event/event"

export const PLAYER_ELIMINATED = 'PLAYER_ELIMINATED'
export const playerEliminated = (matchId: string, playerId : string) => 
        Event.create(
            PLAYER_ELIMINATED, 
            {
                matchId,
                playerId
            },
            new Date()
        )   