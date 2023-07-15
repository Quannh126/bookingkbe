import { Router } from "express";
import { Route } from "@core/interfaces";

import {
    authMiddleware,
    validateMiddleware,
    verifyRolesMiddleware,
} from "@core/middlewares";
import TripController from "./trips.controller";
import CreateTripDTO from "./dto/create_trips.dto";
import UpdateTripDTO from "./dto/update_trip.dto";
import { rolesMap } from "@core/utils/roles";

export default class TripsRoute implements Route {
    public path = "/trips";
    public router = Router();

    public tripController = new TripController();

    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post(
            this.path,
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            validateMiddleware(CreateTripDTO, true),
            this.tripController.addTrip
        );

        this.router.get(
            this.path,
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            this.tripController.getAllTrip
        );
        this.router.delete(
            this.path + "/:trip_id",
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            this.tripController.deleteTrip
        );
        this.router.put(
            this.path,
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            validateMiddleware(UpdateTripDTO, true),
            this.tripController.updateTrip
        );
        this.router.get(
            this.path + "/search",
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            this.tripController.getSearchTrip
        );
        this.router.get(
            this.path + "/option/:trip_id",
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            this.tripController.getPickupAndDropoffOption
        );
        this.router.get(
            this.path + "/:trip_id",
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            this.tripController.getTrip
        );
    }
}
