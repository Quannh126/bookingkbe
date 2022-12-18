import { NextFunction, request, Request, response, Response } from "express";
import { CarsService } from "@modules/cars";
import { TokenData } from "@modules/auth";
import AddCarDto from "./dto/addCars.dto";
import UpdateCarDto from "./dto/updateCars.dto";

export default class UserController {
    private carService = new CarsService();
    public addCar = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: AddCarDto = req.body;
            const car = await this.carService.addCar(model);

            res.status(201).json(car);
        } catch (error) {
            next(error);
        }
    };

    public getAllCar = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const cars = await this.carService.getAllCar();

            res.status(201).json(cars);
        } catch (error) {
            next(error);
        }
    };

    public getCarById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const car = await this.carService.getCar(req.params.carId);

            res.status(201).json(car);
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
            const page: number = Number(req.params.page);
            const keyword: string = req.query.toString();
            const cars = await this.carService.getAllPaging(keyword, page);
            res.status(201).json(cars);
        } catch (error) {
            next(error);
        }
    };

    public deleteCar = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const result = await this.carService.deleteCar(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };
    public updateCar = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const model: UpdateCarDto = req.body;
            await this.carService.addCar(model);

            const result = await this.carService.updateCar(model);

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };
}
