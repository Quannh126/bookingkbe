import { Router } from "express";
import { Route } from "@core/interfaces";
import BookingController from "./book.controller";
import {
    authMiddleware,
    validateMiddleware,
    verifyRolesMiddleware,
} from "@core/middlewares";
import AddBookingDto from "./dto/add_booking.dto";
import UpdateBookingDto from "./dto/update_book.dto";
import SwapSeatDTO from "./dto/seat_swap.dto";
import { rolesMap } from "@core/utils/roles";

export default class BookingRoute implements Route {
    public path = "/booking";
    public router = Router();

    public bookingController = new BookingController();

    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post(
            this.path,
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            validateMiddleware(AddBookingDto, true),
            this.bookingController.addBooking
        );
        this.router.get(
            this.path + "/search",
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            this.bookingController.getSearchBooked
        );
        this.router.get(
            this.path + "/getDonutData",
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            this.bookingController.getDonut
        );
        this.router.put(
            this.path,
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            validateMiddleware(AddBookingDto, true),
            this.bookingController.updateBooking
        );
        this.router.put(
            this.path + "/remove",
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            validateMiddleware(AddBookingDto, true),
            this.bookingController.removeBooking
        );
        this.router.put(
            this.path + "/change-seat",
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            validateMiddleware(SwapSeatDTO, true),
            this.bookingController.swapSeat
        );
        this.router.get(
            this.path,
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            this.bookingController.getBooked
        );
    }
}
