import { Router } from "express";
import { Route } from "@core/interfaces";
import UserController from "./users.controller";
import {
    authMiddleware,
    validateMiddleware,
    verifyRolesMiddleware,
} from "@core/middlewares";
import RegisterDto from "./dtos/register.dto";
import { rolesMap } from "@core/utils/roles";
export default class UserRoute implements Route {
    public path = "/users";
    public router = Router();

    public userController = new UserController();

    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post(
            this.path,
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            validateMiddleware(RegisterDto, true),
            this.userController.register
        );

        this.router.get(
            this.path,
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            this.userController.getAllUser
        );
        this.router.get(
            this.path + "/paging/:page",
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            this.userController.getAllPaging
        );

        this.router.delete(
            this.path + "/:id",
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            this.userController.deleteUser
        );
    }
}
