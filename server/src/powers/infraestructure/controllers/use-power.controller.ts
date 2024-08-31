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
import { UsePowerDTO } from '../../application/commands/use-power/types/dto';
import { UsePowerResponse } from '../../application/commands/use-power/types/response';
import { UsePowerCommand } from '../../application/commands/use-power/use-power.command';

export class UsePowerController{
    
    //TODO : mandar mejor un json y borralo xd
    async execute(data : UsePowerDTO): Promise<UsePowerResponse> {
        
        const services = new LoggerDecorator(
                            new ErrorHandler(
                                new UsePowerCommand(
                                    matchRepository,
                                    powerMemoryRepository,
                                    eventMediator
                                ),
                            ),
                            new NodeLogger(),
                            'USE_POWER'
                        )

        const result = await services.execute({
            matchId : data.matchId,
            powerId : data.powerId
        })
        if ( result.isSuccessful() ){
            return result.value
        }
        throw result.error;

    }

}