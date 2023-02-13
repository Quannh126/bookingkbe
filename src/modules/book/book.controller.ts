import { NextFunction, request, Request, response, Response } from "express";
import { CarsService, ICarDetail } from "@modules/cars";
import { TokenData } from "@modules/auth";
import AddCarDto from "./dto/add_booking.dto";
import UpdateCarDto from "./dto/update_book.dto";
import BookingService from "./book.services";
import AddBookingDto from "./dto/add_booking.dto";
import { convertDateToString, Logger } from "@core/utils";

export default class BookingController {
    private bookingService = new BookingService();
    public addBooking = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const model: AddBookingDto = req.body;
            const booking = await this.bookingService.booking(model);
            res.status(201).json({ msg: "success" });
            Logger.info(booking);
        } catch (error) {
            next(error);
        }
    };

    public getSearchBooked = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const route = req.query.route as string;
            const journey_date = req.query.journey_date as string;
            const pickup_point = req.query.pickup_point as string;
            const dropoff_point = req.query.dropoff_point as string;
            const booking = await this.bookingService.getSearchBooking(
                journey_date,
                route,
                pickup_point,
                dropoff_point
            );
            res.status(200).json(booking);
            // Logger.info(booking);
        } catch (error) {
            next(error);
        }
    };

    public getBooked = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const booking = await this.bookingService.getSearchBooking(
                convertDateToString(new Date()),
                "1-2",
                "",
                ""
            );
            res.status(200).json(booking);
            // Logger.info(booking);
        } catch (error) {
            next(error);
        }
    };
}
