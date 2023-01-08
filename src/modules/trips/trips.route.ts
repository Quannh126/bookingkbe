import { Router } from "express";
import { Route } from "@core/interfaces";

import { authMiddleware, validateMiddleware } from "@core/middlewares";
import TripController from "./trips.controller";
import CreateTripDTO from "./dto/create_trips.dto";

export default class TripsRoute implements Route {
    public path = "/api/admin/trips";
    public router = Router();

    public tripController = new TripController();

    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post(
            this.path + "/:carid",
            // authMiddleware,
            validateMiddleware(CreateTripDTO, true),
            this.tripController.addTrip
        );
        this.router.get(this.path + "/:carid", this.tripController.getListTrip);
        this.router.get(this.path, this.tripController.getAllTrip);
        this.router.delete(
            this.path + "/:carid",
            //authMiddleware,
            this.tripController.deleteTrip
        );
        this.router.put(
            this.path + "/:carid",
            // authMiddleware,
            validateMiddleware(CreateTripDTO, true),
            this.tripController.updateTrip
        );
    }
}
