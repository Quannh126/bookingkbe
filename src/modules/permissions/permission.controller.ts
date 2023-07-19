import { NextFunction, request, Request, response, Response } from "express";
import { CustomerService, ICustomerDetial } from "@modules/customer";
import PermissionService from "./permission.service";
import { AddPermissionDTO, UpdatePermissionDTO } from "./dto/permission.dto";

export default class PermissionController {
    private customerService = new PermissionService();
    public addPermission = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data: AddPermissionDTO = req.body;
            const result = await this.customerService.addPermission(data);
            res.status(201).json({ message: "success", data: result });
        } catch (error) {
            next(error);
        }
    };
    public updatePermission = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data: UpdatePermissionDTO = req.body;
            const result = await this.customerService.updatePermission(data);
            res.status(200).json({ message: "success", data: result });
        } catch (error) {
            next(error);
        }
    };

    public removePermission = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const role: string = req.params.id;
            const result = await this.customerService.removePermission(role);
            res.status(200).json({ message: "success", data: result });
        } catch (error) {
            next(error);
        }
    };

    public getPermission = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const role: string = req.params.id;
            const result = await this.customerService.getPermission(role);
            res.status(200).json({ message: "success", data: result });
        } catch (error) {
            next(error);
        }
    };

    public getAllPermission = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const role: string = req.body;
            const result = await this.customerService.getAllPermission();
            res.status(200).json({ message: "success", data: result });
        } catch (error) {
            next(error);
        }
    };
}
