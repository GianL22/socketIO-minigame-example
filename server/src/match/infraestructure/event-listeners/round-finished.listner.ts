import { Server } from 'socket.io';
import { EventListener } from '../../../core/infraestructure/event-listener/event-listener';
import { eventMediator, EventMediator } from '../../../core/infraestructure/event-mediator/event-mediator';
import { LoggerDecorator } from '../../../core/application/decorators/logger.decorator';
import { NodeLogger } from '../../../core/infraestructure/logger/node.logger';
import { GetCurrentRoundQuery } from '../../application/querys/get-current-round/get-current-round.query';
import { matchRepository } from '../repositories/match-memory.repository';
import { ErrorHandler } from '../../../core/application/decorators/error_handler.decorator';
import { SelectPlayerWithCaseCommand } from '../../application/command/select-player-with-case/select-player-with-case.command';
import { PassToNextRoundCommand } from '../../application/command/pass-to-next-round/pass-to-next-round.command';

export class RoundFinishedEventListener extends EventListener{
    
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
                            new ErrorHandler(
                                new PassToNextRoundCommand(
                                    eventMediator,
                                    matchRepository,
                                ),
                            ),
                            new NodeLogger(),
                            'PASS_TO_NEXT_ROUND'
                        )
        const result = await services.execute({
            matchId : data.matchId,
        })
    }

}