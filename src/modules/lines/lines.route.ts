import { Router } from "express";
import { Route } from "@core/interfaces";

import {
    authMiddleware,
    validateMiddleware,
    verifyRolesMiddleware,
} from "@core/middlewares";
import LineController from "./lines.controller";
import CreateLineDTO from "./dto/create_lines.dto";
import { rolesMap } from "@core/utils/roles";

export default class LineRoute implements Route {
    public path = "/lines";
    public router = Router();

    public LineController = new LineController();

    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post(
            this.path,
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            validateMiddleware(CreateLineDTO, true),
            this.LineController.addLine
        );
        this.router.get(
            this.path + "/options",
            this.LineController.getOptionLine
        );
        this.router.get(this.path, this.LineController.getListLine);
        this.router.delete(
            this.path + "/:lineid",
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            this.LineController.deleteTrip
        );
        this.router.put(
            this.path + "/:lineid",
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            validateMiddleware(CreateLineDTO, true),
            this.LineController.updateLine
        );
    }
}
