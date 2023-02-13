import { Router } from "express";
import { Route } from "@core/interfaces";
import TestController from "./tests.controller";
import { authMiddleware, validateMiddleware } from "@core/middlewares";

export default class CarsRoute implements Route {
    public path = "/api/admin/testquery";
    public router = Router();

    public testController = new TestController();

    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.get(
            this.path,
            // authMiddleware,
            this.testController.testQuery
        );
    }
}
