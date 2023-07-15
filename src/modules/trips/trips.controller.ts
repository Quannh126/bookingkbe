import { NextFunction, request, Request, response, Response } from "express";
import { TripService } from "@modules/trips";

import CreateTripDTO from "./dto/create_trips.dto";
import ITrip from "./interfaces/trip.interface";
import UpdateTripDTO from "./dto/update_trip.dto";
export default class TripController {
    private tripService = new TripService();
    public addTrip = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data: CreateTripDTO = req.body;
            //const carid: string = req.params.carid;
            const listTrip = await this.tripService.addTrip(data);
            res.status(201).json(listTrip);
        } catch (error) {
            next(error);
        }
    };
    public getAllTrip = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const listCar = await this.tripService.getAllTrip();
            res.status(200).json(listCar);
        } catch (error) {
            next(error);
        }
    };
    public getTrip = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const trip_id: string = req.params.trip_id;
            const listTrip = await this.tripService.getTripDetail(trip_id);
            res.status(200).json(listTrip);
        } catch (error) {
            next(error);
        }
    };

    public deleteTrip = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { trip_id } = req.params;
            const result = await this.tripService.deleteTrip(trip_id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };
    public updateTrip = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data: UpdateTripDTO = req.body;
            const result = await this.tripService.updateTrip(data);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };
    public getSearchTrip = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            // const { route, journey_date, pickup_point, dropoff_point } =
            //     req.query;
            const route = req.query.route as string;

            const pickup_point = req.query.pickup_point as string;
            const dropoff_point = req.query.dropoff_point as string;

            const result = await this.tripService.getSearchTrip(
                route,
                pickup_point,
                dropoff_point
            );
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };
    public getPickupAndDropoffOption = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { trip_id } = req.params;
            const result = await this.tripService.getPickupAndDropoffOption(
                trip_id
            );
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };
}
