import { NextFunction, request, Request, response, Response } from "express";
import { CarsService, ICarDetail } from "@modules/cars";
import { TokenData } from "@modules/auth";
import AddCarDto from "./dto/add_booking.dto";
import UpdateCarDto from "./dto/update_book.dto";
import BookingService from "./book.services";
import AddBookingDto from "./dto/add_booking.dto";
import { convertDateToString, Logger } from "@core/utils";
import SwapSeatDTO from "./dto/seat_swap.dto";
import UpdateBookingDto from "./dto/update_book.dto";

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

    public updateBooking = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const model: UpdateBookingDto = req.body;
            const booking = await this.bookingService.updateBooking(model);
            res.status(201).json({ msg: "success" });
            Logger.info(booking);
        } catch (error) {
            next(error);
        }
    };

    public swapSeat = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const model: SwapSeatDTO = req.body;
            const booking = await this.bookingService.swapSeat(model);
            res.status(201).json({ msg: "success" });
            Logger.info(booking);
        } catch (error) {
            next(error);
        }
    };

    public removeBooking = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { trip_id, list_seat } = req.body;

            const booking = await this.bookingService.destroyBooking(
                trip_id,
                list_seat
            );
            res.status(200).json({ msg: "success" });
            Logger.info(booking);
        } catch (error) {
            next(error);
        }
    };

    public getDonut = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const result = await this.bookingService.getDonutData();
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };
    public getYearData = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const result = await this.bookingService.getDataOfYear(2023);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    public getMonthData = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const result = await this.bookingService.getDataOfMonth(2023);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    public getWeekData = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const result = await this.bookingService.getDataOfWeek(2023);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };
}
