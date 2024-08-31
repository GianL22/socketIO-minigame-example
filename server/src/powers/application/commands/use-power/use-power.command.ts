import { Result } from "../../../../utils/result";
import { SelectPowerOwnerService } from "../../../domain/services/select-power-owner.service";
import { Power } from "../../../domain/power";
import { ChangeIsSafeCasePower } from "../../../domain/change-issafe-case.power";
import { IdGenerator } from "../../../../core/application/id-generator/id.generator";
import { Match } from "../../../../match/domain/match";
import { MatchRepository } from "../../../../match/application/repositories/match.repository";
import { PowerRepository } from "../../repository/power.repository";
import { matchRepository } from '../../../../match/infraestructure/repositories/match-memory.repository';
import { UsePowerResponse } from "./types/response";
import { UsePowerDTO } from "./types/dto";
import { ApplicationService } from "../../../../core/application/service/application.service";
import { EventMediator } from "../../../../core/infraestructure/event-mediator/event-mediator";

export class UsePowerCommand implements ApplicationService<UsePowerDTO, UsePowerResponse>{
    
    constructor(
        private matchRepository : MatchRepository,
        private powerRepository : PowerRepository,
        private eventMediator : EventMediator,
    ){}

    async execute(data: UsePowerDTO): Promise<Result<UsePowerResponse>> {
        
        const matchPromise = this.matchRepository.findById(data.matchId)
        const powerPrommise = this.powerRepository.findById(data.powerId)
        const optionals = await Promise.all([matchPromise, powerPrommise])

        const matchOpt = optionals[0]
        const powerOpt = optionals[1]

        if ( !matchOpt.hasValue() ) throw new Error('match doesnt exist');
        const match : Match = matchOpt.value;

        if ( !powerOpt.hasValue() ) throw new Error('power doesnt exist');
        const power : Power = powerOpt.value;

        power.usePowerEffect(match);

        this.powerRepository.save(power)
        this.eventMediator.publish(power.pullEvents())
        return Result.makeSuccessful({
            roomId : match.roomId,
            powerId : power.id,
            playerId : power.owner.id
        })

    }

}
