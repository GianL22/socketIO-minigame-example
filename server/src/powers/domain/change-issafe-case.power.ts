import { Match } from "../../match/domain/match";
import { changeIsSafeUsed } from "./events/change-issafe-used.event";
import { Power } from "./power";

export class ChangeIsSafeCasePower extends Power{
    powerName: string = "Cambiar Contenido del maletin";

    usePowerEffect(match: Match): void {
        const changeIsSafe = Math.floor(Math.random() * 2)
        if (changeIsSafe == 1) match.toggleCurrentCaseIsSafe();
        this.publish(changeIsSafeUsed(this.roomId, this.matchId, this.owner.id, this.owner.name))
    }

}
