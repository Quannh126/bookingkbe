import { Router } from "express";
import { Route } from "@core/interfaces";
import CarController from "./cars.controller";
import { authMiddleware, validateMiddleware } from "@core/middlewares";
import { AddCarDto } from "./dto";

export default class CarsRoute implements Route {
  public path = "/api/cars";
  public router = Router();

  public carController = new CarController();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(
      this.path,
      // authMiddleware,
      validateMiddleware(AddCarDto, true),
      this.carController.addCar
    );
    this.router.get(this.path, this.carController.getAllCar);
    this.router.get(this.path + "/:carid", this.carController.getAllCar);
    this.router.get(
      this.path + "/paging/:page",
      this.carController.getAllPaging
    );

    this.router.delete(
      this.path + "/:carid",
      authMiddleware,
      this.carController.deleteCar
    );
    this.router.put(
      this.path + "/:carid",
      authMiddleware,
      validateMiddleware(AddCarDto, true),
      this.carController.deleteCar
    );
  }
}
