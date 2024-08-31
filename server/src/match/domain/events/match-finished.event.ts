import { Event } from "../../../core/domain/event/event"

export const MATCH_FINISHED = 'MATCH_FINISHED'
export const matchFinished = (roomId : string, matchId : string, playerId : string, playerName : string, playerColor : string) => 
        Event.create(
            MATCH_FINISHED, 
            {
                matchId,
                roomId, 
                playerId,
                playerName,
                playerColor

            },
            new Date()
        )   