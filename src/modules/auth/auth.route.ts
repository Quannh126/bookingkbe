import { Router } from "express";
import { Route } from "@core/interfaces";
import AuthController from "./auth.controller";
import {
    authMiddleware,
    refreshTokenMiddleware,
    validateMiddleware,
} from "@core/middlewares";
import LoginDto from "./auth.dto";

export default class AuthRoute implements Route {
    public path = "/auth";
    public router = Router();
    public authController = new AuthController();
    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post(
            this.path,
            validateMiddleware(LoginDto, true),
            this.authController.login
        );
        this.router.get(
            this.path,
            authMiddleware,
            this.authController.getCurrentUser
        );
        this.router.post(
            this.path + "/refresh",
            refreshTokenMiddleware,
            this.authController.refreshToken
        );
        this.router.post(this.path + "/logout", this.authController.logout);
    }
}
