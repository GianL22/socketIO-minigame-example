import { Event } from "../../domain/event/event"
import { EventListener } from "../event-listener/event-listener"

type SuscriberCallback = (data: object) => Promise<void>

interface SuscribersMap {
    [name : string] : EventListener[]
}

export class EventMediator {
    
    private suscribers : SuscribersMap = {}    
    
    suscribe(event : string, eventListener : EventListener){
        if ( this.suscribers[event] ){
            this.suscribers[event].push(eventListener)
            return
        }
        this.suscribers[event] = [eventListener]
    }

    publish( events : Event[] ){
        events.forEach((event) => {
            if ( !this.suscribers[event.name] ) return 
            this.suscribers[event.name].forEach((eventListener) => {
                eventListener.execute(event.data)
            })
        })
    }
}
export const eventMediator = new EventMediator()