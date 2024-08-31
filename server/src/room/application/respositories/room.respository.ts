import { Optional } from "../../../utils/optional"
import { Room } from "../../domain/room"

export interface RoomRepository{
    findById(id : string): Promise<Optional<Room>>
    save(room : Room): Promise<void>
    deleteById(id : string):Promise<void>
}