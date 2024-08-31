import { Event } from '../../domain/event/event';
import { EventMediator } from '../event-mediator/event-mediator';

export abstract class EventListener{
    //TODO: En lugar de strings pueden ser otra cosa los eventstosuscribe?
    constructor( private _eventsToSuscribe : string[], private _eventMediator : EventMediator ){
        _eventsToSuscribe.forEach((event)=> {
            _eventMediator.suscribe(event, this)
        })
    }
    abstract execute( data: object ) : Promise<void>
}