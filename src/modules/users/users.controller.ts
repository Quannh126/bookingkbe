import { NextFunction, Request, Response } from "express";
import RegisterDto from "./dtos/register.dto";
import UserService from "./users.service";
import { TokenData } from "@modules/auth";
export default class UserController {
    private userService  = new UserService();
    public register = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const model: RegisterDto = req.body;
            const tokenData: TokenData = await this.userService.createUser(model);

            res.status(201).json(tokenData)
        }catch(error){
            next(error);
        }
    };

    public getAllUser = async (req: Request, res: Response, next: NextFunction) => {
        try{

            const users = this.userService.getAll();
            

            res.status(201).json(users)
        }catch(error){
            next(error);
        }
    };
    public getAllPaging = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const page: number = Number(req.params.page);
            const keyword: string = req.query.toString();
            const users = this.userService.getAllPaging(keyword, page);
            res.status(201).json(users)
        }catch(error){
            next(error);
        }
    };

    public deleteUser = async (req: Request, res: Response, next: NextFunction) =>{
        try{
            const result = await this.userService.deleteUser(req.params.id);
            res.status(200).json(result);
        }catch(error){
            next(error);
        }
    }
}