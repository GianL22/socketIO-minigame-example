import { Match } from "../../match/domain/match";
import { stealCasePowerUsed } from "./events/steal-case-power-used.event";
import { Power } from "./power";

export class StealCasePower extends Power{
    powerName: string = "Robar Maletin";

    usePowerEffect(match: Match): void {
        match.changePlayerWithCase(this.owner)
        this.publish(stealCasePowerUsed(this.roomId, this.matchId, this.owner.id, this.owner.name, this.owner.color))
    }

}
