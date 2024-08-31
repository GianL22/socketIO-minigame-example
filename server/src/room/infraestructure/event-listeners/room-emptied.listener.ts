import { EventListener } from '../../../core/infraestructure/event-listener/event-listener';
import { EventMediator } from '../../../core/infraestructure/event-mediator/event-mediator';
import { RoomJSONRespository } from '../respository/room.json.responsitory';
import { LoggerDecorator } from '../../../core/application/decorators/logger.decorator';
import { NodeLogger } from '../../../core/infraestructure/logger/node.logger';
import { RemoveRoomCommand } from '../../application/commands/remove/remove-room.command';
import { roomEmptied } from '../../domain/events/room-emptied.event';

export class RoomEmptiedEventListener extends EventListener{
    
    //TODO : Poner aqui a los eventos que se suscriben
    constructor(
        eventsToSuscribe : string[],
        eventMediator : EventMediator,
    ){
        //TODO: Raro esto.... Mejorar
        super(eventsToSuscribe, eventMediator);
    }

    //TODO : mandar mejor un json y borralo xd
    async execute(data : any): Promise<void> {
        const services = new LoggerDecorator(
                            new RemoveRoomCommand(
                                new RoomJSONRespository(''  )
                            ),
                            new NodeLogger(),
                            'Remove-Room'
                        )
        const result = await services.execute({
                            roomId : data.roomId
                        })
        
    }

}