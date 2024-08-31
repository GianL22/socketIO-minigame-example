import { Request, RequestHandler, Response } from "express"
import { METHOD_TYPES } from "../router-parser/router-parser"

export abstract class Controller{
    constructor(
        private _path : string,
        private _method : METHOD_TYPES,
    ){}

    get path(){
        return this._path
    }

    get method(){
        return this._method
    }

    abstract execute(req : Request, res : Response) : Promise<void>
    abstract middlewares() : RequestHandler[]
    
}