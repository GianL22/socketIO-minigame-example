
import { Match } from '../match';

export class KeepCaseService{
    //TODO : Cambiar
    keep(match : Match, playerId : string){
        const player = match.remain.find(p => p.id == playerId)
        if (!player) throw new Error("Player is not in the match");
        match.keepCase()
    }
}