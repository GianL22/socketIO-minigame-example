import { ApplicationService } from "../../../../core/application/service/application.service";
import { Result } from "../../../../utils/result";
import { MatchRepository } from "../../repositories/match.repository";
import { GetCurrentRoundDTO } from "./types/dto";
import { GetCurrentRoundResponse, PlayerResponse } from "./types/response";

export class GetCurrentRoundQuery implements ApplicationService<GetCurrentRoundDTO, GetCurrentRoundResponse>{
    
    constructor(
        private matchRepository : MatchRepository
    ){}

    async execute(data: GetCurrentRoundDTO): Promise<Result<GetCurrentRoundResponse>> {
        const matchOpt = await this.matchRepository.findById(data.matchId)
        if ( !matchOpt.hasValue() ) throw new Error('match doesnt exist');
        const match = matchOpt.value;


        //Moverlo a un servicio de dominio?
        const remainPlayers = match.remain;
        const avaiblePlayersToSelect : PlayerResponse[] = []
        const playerWithCase = match.playerWithCase


        remainPlayers.forEach(player => {
            const isEliminated = match.eliminatedPlayers.find(p => p.id == player.id);
            if (isEliminated) return;
            
            const isSafed = match.safedPlayers.find(p => p.id == player.id);
            if (isSafed) return;

            if (playerWithCase == player) return;
            avaiblePlayersToSelect.push({
                id : player.id,
                name : player.name,
                color : player.color
            })
        });
        

        return Result.makeSuccessful({
            matchId : match.id,
            roundId : match.roundId,
            avaiblePlayersToSelect,
            playerWithCase : {
                id : match.playerWithCase.id,
                name : match.playerWithCase.name,
                color : match.playerWithCase.color
            }, 
            playerWithoutCase : (match.playerWithoutCase) ? {
                id : match.playerWithoutCase.id,
                name : match.playerWithoutCase.name,
                color : match.playerWithoutCase.color,
            } : undefined,
            currentCaseId : match.currentCase.id,
            remainCasesIds : match.roundRemainCases.map(c => c.id),
            remainPlayers : match.remain.map(p => {
                return {id : p.id, name : p.name, color : p.color }
            }),
            safedPlayers : match.safedPlayers.map(p => {
                return {id : p.id, name : p.name, color : p.color }
            }),
            eliminatedPlayers : match.eliminatedPlayers.map(p => {
                return {id : p.id, name : p.name, color : p.color }
            }),
        })        

    }

}
