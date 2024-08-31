import { Entity } from "../../core/domain/entity"

export class Player extends Entity{
    
    constructor(
        id : string,
        private _name : string,
        private _color : string
    ){
        super(id)
    }

    get name(){
        return this._name
    }

    get color(){
        return this._color
    }

    changeName(color : string){
        this._color = color
    }

    changeColor(color : string){
        this._color = color
    }
    validState(){
        if (
            !this.id ||
            !this._name ||
            !this._color
        ) 
        throw new Error('Invalid State')
    }
}