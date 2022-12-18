import { Router } from "express";
import { Route } from "@core/interfaces";
import UserController from "./users.controller";
import { authMiddleware, validateMiddleware } from "@core/middlewares";
import RegisterDto from "./dtos/register.dto";
export default class UserRoute implements Route {
    public path = "/api/users";
    public router = Router();

    public userController = new UserController();

    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post(
            this.path,
            validateMiddleware(RegisterDto, true),
            this.userController.register
        );

        this.router.get(
            this.path,
            //authMiddleware,
            this.userController.getAllUser
        );
        this.router.get(
            this.path + "/paging/:page",
            this.userController.getAllPaging
        );

        this.router.delete(
            this.path + "/:uid",
            authMiddleware,
            this.userController.deleteUser
        );
    }
}
