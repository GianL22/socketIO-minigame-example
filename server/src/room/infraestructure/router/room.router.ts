import { Router } from "express";
import { roomControllers } from "../controllers/room-controllers";
import { routeParser } from "../../../core/infraestructure/router-parser/router-parser";
import { Controller } from "../../../core/infraestructure/controller/controller";

export const roomRouter = Router()
roomControllers.forEach((controller : Controller) => {
    routeParser(roomRouter, controller)
})
