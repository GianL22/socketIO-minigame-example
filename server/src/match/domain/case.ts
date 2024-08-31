import { Entity } from "../../core/domain/entity";
//TODO : Mejorar el modelado del dominio
export class Case extends Entity{
    constructor(
        id : string,
        private _isSafe : boolean
    ){
        super(id)
    }

    get isSafe(){
        return this._isSafe
    }

    changeSafe(){
        this._isSafe = !this._isSafe
    }

}