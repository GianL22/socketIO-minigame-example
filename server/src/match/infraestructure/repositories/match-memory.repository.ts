import { Optional } from "../../../utils/optional";
import { MatchRepository } from "../../application/repositories/match.repository";
import { Match } from "../../domain/match";


interface IMemoryDB {
    [matchId : string] : Match | undefined
} 

export class MatchMemoryRepository implements MatchRepository{
    
    private matches : IMemoryDB = {} 

    async findById(matchId: string): Promise<Optional<Match>> {
        if (this.matches[matchId]) {
            return new Optional(this.matches[matchId]);
        }
        return new Optional()
    }
    async save(match: Match): Promise<void> {
        this.matches[match.id] = match
    }
    
    async delete(matchId: string): Promise<void> {
        this.matches[matchId] = undefined;
    }

}

export const matchRepository = new MatchMemoryRepository()