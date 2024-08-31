import { Event } from "./event/event"

export class Entity{

    private _events : Event[] = []

    constructor(
        protected _id: string
    ){}

    get id(){
        return this._id
    }

    publish(event : Event) {
        this._events.push(event)
    }
    
    pullEvents() : Event[]{
        const events = [...this._events]
        this._events = []
        return events
    }

}