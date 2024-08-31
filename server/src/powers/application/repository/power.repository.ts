import { Optional } from "../../../utils/optional"
import { Power } from "../../domain/power"

export interface PowerRepository{
    findById(powerId : string) : Promise<Optional<Power>>
    save(power : Power):void
}