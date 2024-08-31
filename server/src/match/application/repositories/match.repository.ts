import { Optional } from "../../../utils/optional";
import { Match } from "../../domain/match";

export interface MatchRepository {
    findById(id : string): Promise<Optional<Match>>
    save(match : Match): Promise<void>
    delete(matchId : string): Promise<void>
}