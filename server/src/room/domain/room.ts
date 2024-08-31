import { Entity } from "../../core/domain/entity"
import { playerJoined } from "./events/player-joined.event";
import { playerLeaved } from "./events/player-leaved.event";
import { roomEmptied } from "./events/room-emptied.event";
import { Player } from './player';

//TODO : Mejorar el modelado del dominio
export class Room extends Entity{

    constructor(
        id : string,
        private _players : Player[] = [],
    ){
        super(id)
        // this.validState();
    }

    get players(){
        return this._players
    }

    joinPlayer(player : Player){
        if ( this._players.find((p) => player.id == p.id) ) throw new Error('Player already in room')
        this.players.push(player)
        this.publish(playerJoined(player.id, this._id))
    }

    leavePlayer(playerId: string){
        const playerToLeave = this._players.find((p) => playerId == p.id)
        if ( !playerToLeave ) throw new Error('Player is not in the room')
        this._players = this._players.filter((p) => playerToLeave.id  != p.id)
        if (this._players.length == 0) this.publish(roomEmptied(this._id))
        this.publish(playerLeaved(playerToLeave.id, this._id))

    }

    validState(){
        if (!this.id) throw new Error('No id provided')
    }

}