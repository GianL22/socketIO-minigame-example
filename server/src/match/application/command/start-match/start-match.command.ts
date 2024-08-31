import { IdGenerator } from "../../../../core/application/id-generator/id.generator";
import { ApplicationService } from "../../../../core/application/service/application.service";
import { EventMediator } from "../../../../core/infraestructure/event-mediator/event-mediator";
import { RoomRepository } from "../../../../room/application/respositories/room.respository";
import { Result } from "../../../../utils/result";
import { Match } from "../../../domain/match";
import { Round } from "../../../domain/round";
import { GenerateMatchSafeCases } from "../../../domain/services/generate-cases.service";
import { SelectFirstWithCasePlayer } from "../../../domain/services/select-first-with-case-player.service";
import { MatchRepository } from "../../repositories/match.repository";
import { StartMatchDTO } from "./types/dto";
import { StartMatchResponse } from "./types/response";


export class StartMatchCommand implements ApplicationService<StartMatchDTO, StartMatchResponse>{

    
    constructor(
        //TODO: Poner puerto, contaminacion OJO
        private idGenerator : IdGenerator<string>,
        private eventMediator : EventMediator,
        private roomRespoitory : RoomRepository,
        private matchRepository : MatchRepository
    ){}

    async execute(data: StartMatchDTO): Promise<Result<StartMatchResponse>> {
        const roomOpt = await this.roomRespoitory.findById(data.roomId)
        if ( !roomOpt.hasValue() ) throw new Error('Room doesnt exist');
        const room = roomOpt.value;

        const firstPlayerWithCase = new SelectFirstWithCasePlayer().select(room.players)
        const cases = new  GenerateMatchSafeCases().generate(room.players)
        const match = new Match(
            this.idGenerator.generate(),
            firstPlayerWithCase,
            cases,
            room.id,
            room.players,
        )

        await this.matchRepository.save(match)
        this.eventMediator.publish(match.pullEvents())
        return Result.makeSuccessful({
            matchId : match.id
        })
    }

}
