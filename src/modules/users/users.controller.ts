import { NextFunction, Request, Response } from "express";
import RegisterDto from "./dtos/register.dto";
import UserService from "./users.service";
import { TokenData } from "@modules/auth";
import { AccessTokenData } from "@modules/auth/auth.interface";
import UpdateUserDTO from "./dtos/update-user.dto";
export default class UserController {
    private userService = new UserService();
    public register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const model: RegisterDto = req.body;
            const tokenData: AccessTokenData =
                await this.userService.createUser(model);
            res.status(201).json(tokenData);
        } catch (error) {
            next(error);
        }
    };

    public getAllUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const users = await this.userService.getAll();

            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    };
    public getAllPaging = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const page = Number(req.params.page);
            const keyword: string = !req.query.keyword
                ? ""
                : req.query.keyword?.toString();
            const users = await this.userService.getAllPaging(keyword, page);
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    };

    public deleteUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const result = await this.userService.deleteUser(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    public updateUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data: UpdateUserDTO = req.body;
            const result = await this.userService.updateUser(data);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };
}
