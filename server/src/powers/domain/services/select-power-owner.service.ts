import { Match } from "../../../match/domain/match";
import { Player } from "../../../room/domain/player";

export class SelectPowerOwnerService{
    select(match : Match) : Player{


        const avaiblePlayersToSelect : Player[] = []

        match.remain.forEach(player => {
            const isEliminated = match.eliminatedPlayers.find(p => p.id == player.id);
            if (isEliminated) return;
            
            const isSafed = match.safedPlayers.find(p => p.id == player.id);
            if (isSafed) return;

            if (match.playerWithCase.id == player.id) return;
            if (match.playerWithoutCase.id == player.id) return;

            avaiblePlayersToSelect.push(player)
        });
        console.log(avaiblePlayersToSelect)
        if ( avaiblePlayersToSelect.length == 0 ) throw new Error("No players avaibles to selected");

        return avaiblePlayersToSelect[Math.floor( Math.random() * avaiblePlayersToSelect.length )]

    }
}