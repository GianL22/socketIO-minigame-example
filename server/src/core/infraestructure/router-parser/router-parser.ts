import { Router } from "express"
import { Controller } from "../controller/controller"

export type METHOD_TYPES = 'GET' | 'POST' | 'PUT' |'PATCH' | 'DELETE' 


const parserDictionary = {
    'GET' : (router : Router, controller : Controller) => router.get(controller.path, controller.middlewares(), controller.execute), 
    'POST' : (router : Router, controller : Controller) => router.post(controller.path, controller.middlewares(), controller.execute), 
    'PUT' : (router : Router, controller : Controller) => router.put(controller.path, controller.middlewares(), controller.execute), 
    'PATCH' : (router : Router, controller : Controller) => router.patch(controller.path, controller.middlewares(), controller.execute), 
    'DELETE' : (router : Router, controller : Controller) => router.delete(controller.path, controller.middlewares(), controller.execute), 
}

export const routeParser = (router : Router, controller : Controller) => {
    return parserDictionary[controller.method](router,controller)
}