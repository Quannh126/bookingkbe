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
            this.path,
            // authMiddleware,
            validateMiddleware(CreateTripDTO, true),
            this.tripController.addTrip
        );
        this.router.get(this.path + "/:trip_id", this.tripController.getTrip);
        this.router.get(this.path, this.tripController.getAllTrip);
        this.router.delete(
            this.path + "/:trip_id",
            //authMiddleware,
            this.tripController.deleteTrip
        );
        this.router.put(
            this.path + "/:trip_id",
            // authMiddleware,
            validateMiddleware(CreateTripDTO, true),
            this.tripController.updateTrip
        );
    }
}
