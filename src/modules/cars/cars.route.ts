import { Router } from "express";
import { Route } from "@core/interfaces";
import CarController from "./cars.controller";
import { authMiddleware, validateMiddleware } from "@core/middlewares";
import RegisterDto from "@modules/users/dtos/register.dto";

export default class UserRoute implements Route {
    public path = '/api/cars';
    public router = Router();

    public carController = new CarController();

    constructor(){
        this.initializeRoutes();
    }
    private initializeRoutes(){
        this.router.post(
            this.path,
            validateMiddleware(RegisterDto, true),
            this.carController.addCar,
        );

        this.router.get(
            this.path,
            this.carController.getAllCar
        );
        this.router.get(
            this.path + '/paging/:page',
            this.carController.getAllPaging
        )

        this.router.delete(
            this.path + '/:uid',
            authMiddleware,
            this.carController.deleteCar
        )
        this.router.put(
            this.path + '/:uid',
            authMiddleware,
            this.carController.deleteCar
        )
    }
}