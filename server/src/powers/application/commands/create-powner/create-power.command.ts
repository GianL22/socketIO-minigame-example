import { ApplicationService } from "../../../../core/application/service/application.service";
import { Result } from "../../../../utils/result";
import { CreatePowerDTO } from "./types/dto";
import { CreatePowerResponse } from "./types/response";
import { EventMediator, eventMediator } from '../../../../core/infraestructure/event-mediator/event-mediator';
import { SelectPowerOwnerService } from "../../../domain/services/select-power-owner.service";
import { ChangeIsSafeCasePower } from "../../../domain/change-issafe-case.power";
import { IdGenerator } from "../../../../core/application/id-generator/id.generator";
import { Match } from "../../../../match/domain/match";
import { MatchRepository } from "../../../../match/application/repositories/match.repository";
import { PowerRepository } from "../../repository/power.repository";
import { PeekCasePower } from "../../../domain/peak-case.power";
import { StealCasePower } from "../../../domain/steal-case.power";

export class CreatePowerCommand implements ApplicationService<CreatePowerDTO, CreatePowerResponse>{
    
    constructor(
        private idGenerator : IdGenerator<string>,
        private matchRepository : MatchRepository,
        private powerRepository : PowerRepository,
        private eventMediator : EventMediator,
    ){}

    async execute(data: CreatePowerDTO): Promise<Result<CreatePowerResponse>> {
        const matchOpt = await this.matchRepository.findById(data.matchId)
        if ( !matchOpt.hasValue() ) throw new Error('match doesnt exist');
        const match : Match = matchOpt.value;
        
        const owner = new SelectPowerOwnerService().select(match)
        const powers = [
            new PeekCasePower( this.idGenerator.generate(), match.roomId, match.id, owner),
            new StealCasePower( this.idGenerator.generate(), match.roomId, match.id, owner),
            new ChangeIsSafeCasePower( this.idGenerator.generate(), match.roomId, match.id, owner),
        ]
        const power = powers[Math.floor(Math.random() * powers.length)]

        this.powerRepository.save(power)
        return Result.makeSuccessful({
            matchId : match.id,
            roomId : match.roomId,
            powerId : power.id,
            playerId : owner.id,
            playerName : owner.name,
            playerColor : owner.color,
            powerName : power.powerName
        })

    }

}
