import { NextFunction, request, Request, response, Response } from "express";
import { CarsService } from "@modules/cars";
import { TokenData } from "@modules/auth";
import AddCarDto from "./dto/addCars.dto";
import UpdateCarDto from "./dto/updateCars.dto";
import { HttpException } from "@core/exceptions";
export default class UserController {
    private carService  = new CarsService();
    public addCar = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const model: AddCarDto = req.body;
            await this.carService.addCar(model);

            res.status(201).json()
        }catch(error){
            next(error);
        }
    };

    public getAllCar = async (req: Request, res: Response, next: NextFunction) => {
        try{

            const cars = this.carService.getAllCar();
            

            res.status(201).json(cars)
        }catch(error){
            next(error);
        }
    };
    public getAllPaging = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const page: number = Number(req.params.page);
            const keyword: string = req.query.toString();
            const cars = this.carService.getAllPaging(keyword, page);
            res.status(201).json(cars)
        }catch(error){
            next(error);
        }
    };

    public deleteCar = async (req: Request, res: Response, next: NextFunction) =>{
        try{
            const result = await this.carService.deleteCar(req.params.id);
            res.status(200).json(result);
        }catch(error){
            next(error);
        }
    }
    public updateCar = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const model: UpdateCarDto = req.body;
            await this.carService.addCar(model);

            
            const result = await this.carService.updateCar(model);
            if(result){
                res.status(201).json(result)
            }
        }catch(error){
            next(error);
        }
    }
}