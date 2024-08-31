import { Server } from 'socket.io';
import { EventListener } from '../../../core/infraestructure/event-listener/event-listener';
import { eventMediator, EventMediator } from '../../../core/infraestructure/event-mediator/event-mediator';
import { LoggerDecorator } from '../../../core/application/decorators/logger.decorator';
import { NodeLogger } from '../../../core/infraestructure/logger/node.logger';
import { ErrorHandler } from '../../../core/application/decorators/error_handler.decorator';
import { CreatePowerCommand } from '../../application/commands/create-powner/create-power.command';
import { UUIDGenerator } from '../../../core/infraestructure/uuid/uuid.generator';
import { matchRepository } from '../../../match/infraestructure/repositories/match-memory.repository';
import { powerMemoryRepository } from '../repositories/power-memory,repository';

export class ChangeIsSafeUsedEventListener extends EventListener{
    
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
        
        // const services = new LoggerDecorator(
        //                     new ErrorHandler(
        //                         new CreatePowerCommand(
        //                             new UUIDGenerator(),
        //                             matchRepository,
        //                             powerMemoryRepository,
        //                             eventMediator
        //                         ),
        //                     ),
        //                     new NodeLogger(),
        //                     'CREATE_POWER'
        //                 )

        // const result = await services.execute({
        //     matchId : data.matchId,
        // })
        // if ( result.isSuccessful() ){
            
        // }
         
        this._io.to(data.roomId).emit(
            'ChageIsSafeUsed',
            data
        )   
    }

}