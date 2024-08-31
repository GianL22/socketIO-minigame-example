import { Entity } from "../../core/domain/entity";
import { Match } from "../../match/domain/match";
import { Player } from '../../room/domain/player';
export abstract class Power extends Entity{

    abstract powerName : string

    constructor(
        id : string,
        private _roomdId : string,
        private _matchId : string,
        //TODO: esto no deberia hacerse asi
        private _owner : Player
    ){
        super(id)
    }

    get roomId(){
        return this._roomdId
    }

    get owner(){
        return this._owner
    }
    
    get matchId(){
        return this._matchId
    }


    abstract usePowerEffect(match : Match) : void

}