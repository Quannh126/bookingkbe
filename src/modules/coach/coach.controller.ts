import { NextFunction, request, Request, response, Response } from "express";
import { CarsService, ICarDetail } from "@modules/cars";
import { TokenData } from "@modules/auth";

import CoachService from "./coach.services";

import { convertDateToString, Logger } from "@core/utils";

import CheckSeatDTO from "./dto/check-seat.dto";
import SwapSeatDTO from "@modules/book/dto/seat_swap.dto";
import AddBookingDto from "@modules/book/dto/add_booking.dto";

export default class CoachController {
    private coachService = new CoachService();

    public getSearchBooked = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const journey_date = req.query.journey_date as string;
            const startLocation = req.query.startLocation as string;
            const endLocation = req.query.endLocation as string;
            const times = req.query.times as string;
            const gn = req.query.gn as string;
            const gt = req.query.gt as string;
            const available_seat = req.query.available_seat as string;
            const booking = await this.coachService.getSearchBooking(
                journey_date,
                startLocation,
                endLocation,
                times,
                gn,
                gt,
                available_seat
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
            const route = req.query.route as string;
            const journey_date = req.query.journey_date as string;
            const pickup_point = req.query.pickup_point as string;
            const dropoff_point = req.query.dropoff_point as string;
            const times = req.query.times as string;
            const car_type = req.query.car_type as string;
            const available_seat = req.query.available_seat as string;
            const booking = await this.coachService.getSearchBooking(
                journey_date,
                route,
                pickup_point,
                dropoff_point,
                car_type,
                times,
                available_seat
            );
            res.status(200).json(booking);
            // Logger.info(booking);
        } catch (error) {
            next(error);
        }
    };
    public addBooking = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const model: AddBookingDto = req.body;
            const booking = await this.coachService.booking(model);
            res.status(201).json({ message: booking });
            Logger.info(booking);
        } catch (error) {
            next(error);
        }
    };
}
