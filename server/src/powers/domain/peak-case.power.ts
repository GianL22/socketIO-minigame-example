import { Match } from "../../match/domain/match";
import { currentCasePeeked } from "./events/current-case-peaked.event";
import { Power } from "./power";

export class PeekCasePower extends Power{
    powerName: string = "Ojear Maletin";

    usePowerEffect(match: Match): void {
        const caseId = match.currentCase.id
        const content = match.currentCase.isSafe

        this.publish(currentCasePeeked(this.roomId, this.matchId, this.owner.id, this.owner.name, caseId, content))
    }

}
