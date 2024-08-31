import { Player } from "../../../room/domain/player";

export class SelectFirstWithCasePlayer{
    select(remain : Player[]) : Player{
        const index = Math.floor(Math.random() * remain.length)
        return remain[index]
    }
}