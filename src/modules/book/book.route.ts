import { Router } from "express";
import { Route } from "@core/interfaces";
import BookingController from "./book.controller";
import { authMiddleware, validateMiddleware } from "@core/middlewares";
import AddBookingDto from "./dto/add_booking.dto";
import UpdateBookingDto from "./dto/update_book.dto";
import SwapSeatDTO from "./dto/seat_swap.dto";

export default class BookingRoute implements Route {
    public path = "/api/admin/booking";
    public router = Router();

    public bookingController = new BookingController();

    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post(
            this.path,
            // authMiddleware,
            validateMiddleware(AddBookingDto, true),
            this.bookingController.addBooking
        );
        this.router.get(
            this.path + "/search",
            this.bookingController.getSearchBooked
        );
        this.router.put(
            this.path,
            // authMiddleware,
            validateMiddleware(AddBookingDto, true),
            this.bookingController.updateBooking
        );

        this.router.put(
            this.path + "/change-seat",
            // authMiddleware,
            validateMiddleware(SwapSeatDTO, true),
            this.bookingController.swapSeat
        );
        this.router.get(this.path, this.bookingController.getBooked);
    }
}