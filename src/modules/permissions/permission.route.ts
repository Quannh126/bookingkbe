import { Router } from "express";
import { Route } from "@core/interfaces";

import {
    authMiddleware,
    validateMiddleware,
    verifyRolesMiddleware,
} from "@core/middlewares";
import PermissionController from "./permission.controller";
import { AddPermissionDTO, UpdatePermissionDTO } from "./dto/permission.dto";
import { rolesMap } from "@core/utils/roles";

export default class PermissionRoute implements Route {
    public path = "/permission";
    public router = Router();

    public permissionController = new PermissionController();

    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post(
            this.path,
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            validateMiddleware(AddPermissionDTO, true),
            this.permissionController.addPermission
        );
        this.router.put(
            this.path,
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            validateMiddleware(UpdatePermissionDTO, true),
            this.permissionController.updatePermission
        );
        this.router.get(
            this.path,
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            this.permissionController.getAllPermission
        );
        this.router.get(
            this.path + "/:id",
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            this.permissionController.getPermission
        );

        this.router.delete(
            this.path + "/:id",
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),

            this.permissionController.removePermission
        );
    }
}
