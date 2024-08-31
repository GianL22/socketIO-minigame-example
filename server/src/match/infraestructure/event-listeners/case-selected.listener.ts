import { Server } from 'socket.io';
import { EventListener } from '../../../core/infraestructure/event-listener/event-listener';
import { EventMediator } from '../../../core/infraestructure/event-mediator/event-mediator';
import { LoggerDecorator } from '../../../core/application/decorators/logger.decorator';
import { NodeLogger } from '../../../core/infraestructure/logger/node.logger';
import { GetCurrentRoundQuery } from '../../application/querys/get-current-round/get-current-round.query';
import { matchRepository } from '../repositories/match-memory.repository';
import { ErrorHandler } from '../../../core/application/decorators/error_handler.decorator';

export class CurrentCaseChangedEventListener extends EventListener{
    
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
                            new ErrorHandler(
                                new GetCurrentRoundQuery(
                                    matchRepository
                                ),
                            ),
                            new NodeLogger(),
                            'GET_CURRENT_ROUND in CurrentCase'
                        )
        const result = await services.execute({
                            matchId : data.matchId
                        })
        if ( result.isSuccessful() ){
            this._io.to(data.roomId).emit(
                'CaseSelected',
                result.value.currentCaseId
            )    
        }
    }

}