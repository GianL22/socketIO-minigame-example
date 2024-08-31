import { Match } from "../match";

export class EstablishDuelWinnerService{
    establish(match : Match){
        const currentCase = match.currentCase
        const currentPlayerWithCase = match.playerWithCase
        if (currentCase.isSafe){
            match.roundSafePlayer(currentPlayerWithCase)
            return;
        }
        match.eliminatePlayer(currentPlayerWithCase)
        
    }
}