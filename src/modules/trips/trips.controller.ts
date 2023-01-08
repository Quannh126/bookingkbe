import { NextFunction, request, Request, response, Response } from "express";
import { TripService } from "@modules/trips";

import CreateTripDTO from "./dto/create_trips.dto";
import ITrip from "./interfaces/trip.interface";

export default class TripController {
    private tripService = new TripService();
    public addTrip = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data: CreateTripDTO = req.body;
            const carid: string = req.params.carid;
            const listTrip = await this.tripService.addTrip(carid, data);
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
    public getListTrip = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const carid: string = req.params.carid;
            const listTrip = await this.tripService.getListTrip(carid);
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
            const tripid = req.body;
            const carid = req.params.carid;
            const result = await this.tripService.removeTrip(carid, tripid);
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
            const carid = req.params.carid;
            const data: ITrip = req.body;
            const result = await this.tripService.updateTrip(carid, data);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };
}
