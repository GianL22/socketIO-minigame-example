import { v4 as uuid } from 'uuid';
import { IdGenerator } from "../../application/id-generator/id.generator";

export class UUIDGenerator implements IdGenerator<String>{
    generate(): string {
        return uuid()
    }

}