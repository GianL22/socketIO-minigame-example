import { Server } from 'socket.io';
import { EventListener } from '../../../core/infraestructure/event-listener/event-listener';
import { eventMediator, EventMediator } from '../../../core/infraestructure/event-mediator/event-mediator';
import { LoggerDecorator } from '../../../core/application/decorators/logger.decorator';
import { NodeLogger } from '../../../core/infraestructure/logger/node.logger';
import { GetCurrentRoundQuery } from '../../application/querys/get-current-round/get-current-round.query';
import { matchRepository } from '../repositories/match-memory.repository';
import { ErrorHandler } from '../../../core/application/decorators/error_handler.decorator';
import { SelectPlayerWithCaseCommand } from '../../application/command/select-player-with-case/select-player-with-case.command';
import { DeleteMatchCommand } from '../../application/command/delete/delete-match.command';

export class MatchFinishedEventListener extends EventListener{
    
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
                                new DeleteMatchCommand(
                                    eventMediator,
                                    matchRepository
                                ),
                            ),
                            new NodeLogger(),
                            'DELETE_MATCH'
                        )
        const result = await services.execute({
            matchId : data.matchId,
        })
        this._io.to(data.roomId).emit(
            'MatchFinished',
            {
                id : data.playerId,
                name : data.playerName,
                color : data.playerColor,
            }   
        )    
    }

}