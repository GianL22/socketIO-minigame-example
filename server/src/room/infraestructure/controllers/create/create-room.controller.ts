import { Request, RequestHandler, Response, NextFunction } from "express";
import { Controller } from "../../../../core/infraestructure/controller/controller";
import { LoggerDecorator } from "../../../../core/application/decorators/logger.decorator";
import { ErrorHandler } from "../../../../core/application/decorators/error_handler.decorator";
import { CreateRoomCommand } from "../../../application/commands/create/create.room.command";
import { RoomJSONRespository } from "../../respository/room.json.responsitory";
import { NodeLogger } from "../../../../core/infraestructure/logger/node.logger";

export class CreateRooomController extends Controller{

    constructor(){ 
        super('/create', 'POST')
    }

    middlewares(): RequestHandler[] {
        //TODO : this can be better
        const roomIdValidation = (req : Request, res: Response, next : NextFunction ) => {
            if ( req.body.roomId )  return next()
            res.status(400).json({
                'message' : 'No Room Id Provided'
            })
        }
        return [
            roomIdValidation
        ]
    }

    async execute(req: Request, res: Response): Promise<void> {
        //TODO : Validate and Sanitize input
        const result = await new LoggerDecorator(
            new ErrorHandler(
                new CreateRoomCommand(
                    new RoomJSONRespository('./')
                ),
            ),
            new NodeLogger(),
            'CREATE_ROOM'
        ).execute(
            {
                id: req.body.roomId
            }
        )
        if (!result.isSuccessful()) {
            res.status(500).json({
                'message' : 'Something was wrong'
            })
            return
        }
        res.json({
            ...result.value
        })
    }

}

