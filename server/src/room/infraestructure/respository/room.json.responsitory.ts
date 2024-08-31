import { read, readFile, readFileSync, writeFile, writeFileSync } from "fs";
import { RoomRepository } from "../../application/respositories/room.respository";
import { Optional } from "../../../utils/optional";
import { Room } from "../../domain/room";
import { Player } from "../../domain/player";
import { unlink } from "fs/promises";
import path from "path";

export class RoomJSONRespository implements RoomRepository{

    constructor(
        private dbPath: string
    ){
        
        //TODO: CAMBIAR A UNA MEJOR IMPLEMENTARCION
        this.dbPath = path.resolve(__dirname, "../../../../db/room");
    }

    async findById(id: string): Promise<Optional<Room>> {
        try {
            const rawtext = readFileSync(this.dbPath + `/room_${id}.json`).toString()
            const json = JSON.parse(rawtext)
            const players : Player[] = json["_players"].map((player : any) => {
                return new Player(player._id, player._name, player._color)
            })
            const room = new Room(json["_id"], players)
            return new Optional(room)
        } catch (error) {
            return new Optional()
        }
    }

    async save(room: Room):  Promise<void>{
        writeFileSync(this.dbPath + `/room_${room.id}.json`, JSON.stringify(room))
    }

    async deleteById(id: string): Promise<void> {
        await unlink(this.dbPath + `/room_${id}.json`)
    }

}