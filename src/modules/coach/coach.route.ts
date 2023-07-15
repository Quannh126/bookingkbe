import { Router } from "express";
import { Route } from "@core/interfaces";
import CoachController from "./coach.controller";
import {
    authMiddleware,
    validateMiddleware,
    verifyRolesMiddleware,
} from "@core/middlewares";
import CheckSeatDTO from "./dto/check-seat.dto";
import AddBookingDto from "@modules/book/dto/add_booking.dto";
import { rolesMap } from "@core/utils/roles";

export default class CoachRoute implements Route {
    public path = "/coaches";
    public router = Router();

    public coachController = new CoachController();

    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.get(
            this.path + "/search",
            this.coachController.getSearchBooked
        );
        this.router.post(
            this.path,
            validateMiddleware(AddBookingDto, true),
            this.coachController.addBooking
        );
        // this.router.post(
        //     this.path + "/check-seat",
        //     // authMiddleware,
        //     validateMiddleware(CheckSeatDTO, true),
        //     this.coachController.checkSeat
        // );
        //this.router.get(this.path, this.coachController.getBooked);
    }
}
