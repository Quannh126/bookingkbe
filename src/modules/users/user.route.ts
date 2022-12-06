import { Router } from "express";
import { Route } from "@core/interfaces";
import UserController from "./users.controller";
export default class UserRoute implements Route {
    public path = '/api/users';
    public router = Router();

    public userController = new UserController();

    constructor(){
        this.initializeRoutes();
    }
    private initializeRoutes(){
        this.router.post(this.path, this.userController.register);
    }
}