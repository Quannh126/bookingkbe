import { NextFunction, Request, Response } from "express";
import { TokenData, LoginDto } from "@modules/auth";
import AuthService from "./auth.service";
export default class UserController {
    private authService  = new AuthService();
    public login = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const model: LoginDto = req.body;
            const tokenData: TokenData = await this.authService.login(model);
            res.status(201).json(tokenData)
        }catch(error){
            next(error);
        }
    };

    public getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const user = await this.authService.getCurrentUser(req.user.id);
            res.status(201).json({...user}) 
        }catch(error){
            next(error);
        }
    };
}