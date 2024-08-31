import { Player } from "../../../room/domain/player";

export class CalculateRemainPlayersService{
    calculate(matchPlayers : Player[], eliminatedPlayers : Player[] ){
        return matchPlayers.filter(player => {
            const isEliminated = eliminatedPlayers.find(p => p.id === player.id)
            if ( isEliminated ) return false
            return true 
        });
    }
}