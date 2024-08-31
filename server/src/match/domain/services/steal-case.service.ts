import { Match } from '../match';

export class StealCaseService{
    //TODO : Cambiar (lo del id y que este servicio de dominoi sea mas reusable)
    steal(match : Match, playerId : string){
        const player = match.remain.find(p => p.id == playerId)
        if (!player) throw new Error("Player is not in the match");
        if  (player.id === match.playerWithoutCase.id){
            match.swapPlayers()
        }
        match.stealCase()
    }
}