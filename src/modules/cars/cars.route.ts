import { Router } from "express";
import { Route } from "@core/interfaces";
import CarController from "./cars.controller";
import {
    authMiddleware,
    validateMiddleware,
    verifyRolesMiddleware,
} from "@core/middlewares";
import { AddCarDto } from "./dto";
import { rolesMap } from "@core/utils/roles";

export default class CarsRoute implements Route {
    public path = "/cars";
    public router = Router();

    public carController = new CarController();

    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post(
            this.path,
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            validateMiddleware(AddCarDto, true),
            this.carController.addCar
        );
        this.router.get(
            this.path + "/carsyettostart",
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            this.carController.getListNameCars
        );
        this.router.get(
            this.path,
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            this.carController.getAllCar
        );
        this.router.get(
            this.path + "/:carid",
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            this.carController.getCarById
        );
        this.router.get(
            this.path + "/paging/:page",
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            this.carController.getAllPaging
        );

        this.router.delete(
            this.path + "/:carid",
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            this.carController.deleteCar
        );
        this.router.put(
            this.path,
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            validateMiddleware(AddCarDto, true),
            this.carController.updateCar
        );
    }
}
