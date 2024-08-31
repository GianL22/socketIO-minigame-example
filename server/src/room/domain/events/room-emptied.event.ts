import { Event } from "../../../core/domain/event/event";
export const ROOM_EMPTIED = 'ROOM_EMPTIED'
export const roomEmptied = (roomId : string) => 
        Event.create(
            ROOM_EMPTIED, 
            {
                roomId
            },
            new Date()
        )   