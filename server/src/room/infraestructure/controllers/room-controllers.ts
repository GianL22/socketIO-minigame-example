import { Controller } from "../../../core/infraestructure/controller/controller";
import { CreateRooomController } from "./create/create-room.controller";

export const roomControllers : Controller[] = [
    new CreateRooomController()
]