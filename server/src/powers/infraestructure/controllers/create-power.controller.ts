import { eventMediator, EventMediator } from '../../../core/infraestructure/event-mediator/event-mediator';
import { LoggerDecorator } from '../../../core/application/decorators/logger.decorator';
import { NodeLogger } from '../../../core/infraestructure/logger/node.logger';
import { ErrorHandler } from '../../../core/application/decorators/error_handler.decorator';
import { CreatePowerCommand } from '../../application/commands/create-powner/create-power.command';
import { UUIDGenerator } from '../../../core/infraestructure/uuid/uuid.generator';
import { matchRepository } from '../../../match/infraestructure/repositories/match-memory.repository';
import { powerMemoryRepository } from '../repositories/power-memory,repository';
import { CreatePowerDTO } from '../../application/commands/create-powner/types/dto';
import { CreatePowerResponse } from '../../application/commands/create-powner/types/response';

export class CreatePowerController{
    
    //TODO : mandar mejor un json y borralo xd
    async execute(data : CreatePowerDTO): Promise<CreatePowerResponse> {
        
        const services = new LoggerDecorator(
                            new ErrorHandler(
                                new CreatePowerCommand(
                                    new UUIDGenerator(),
                                    matchRepository,
                                    powerMemoryRepository,
                                    eventMediator
                                ),
                            ),
                            new NodeLogger(),
                            'CREATE_POWER'
                        )

        const result = await services.execute({
            matchId : data.matchId,
        })
        if ( result.isSuccessful() ){
            return result.value
        }
        throw new Error("Create Power error")

    }

}