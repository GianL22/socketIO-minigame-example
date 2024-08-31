import { Server } from 'socket.io';
import { EventListener } from '../../../core/infraestructure/event-listener/event-listener';
import { EventMediator } from '../../../core/infraestructure/event-mediator/event-mediator';
import { AllPlayersQuery } from '../../application/querys/all-players/all.players.query';
import { RoomJSONRespository } from '../respository/room.json.responsitory';
import { LoggerDecorator } from '../../../core/application/decorators/logger.decorator';
import { NodeLogger } from '../../../core/infraestructure/logger/node.logger';

export class PlayerJoinedEventListener extends EventListener{
    
    //TODO : Poner aqui a los eventos que se suscriben
    constructor(
        eventsToSuscribe : string[],
        eventMediator : EventMediator,
        private _io : Server
    ){
        //TODO: Raro esto.... Mejorar
        super(eventsToSuscribe, eventMediator);
    }

    //TODO : mandar mejor un json y borralo xd
    async execute(data : any): Promise<void> {
        const services = new LoggerDecorator(
                            new AllPlayersQuery(
                                new RoomJSONRespository('')
                            ),
                            new NodeLogger(),
                            'All-Player'
                        )
        const result = await services.execute({
                            roomId : data.roomId
                        })
        if ( result.isSuccessful() ){
            this._io.to(data.roomId).emit(
                'playerJoined',
                result.value   
            )    
        }
    }

}