import { Optional } from "../../../utils/optional";
import { PowerRepository } from "../../application/repository/power.repository";
import { Power } from "../../domain/power";


interface IMemoryDB {
    [matchId : string] : Power
} 

export class PowerMemoryRepository implements PowerRepository{

    private powers : IMemoryDB = {} 

    async findById(powerId: string): Promise<Optional<Power>> {
        if ( this.powers[powerId] ) return new Optional(this.powers[powerId]);
        return new Optional()
    }
    save(power: Power) {
        this.powers[power.id] = power
    }

}

export const powerMemoryRepository = new PowerMemoryRepository()