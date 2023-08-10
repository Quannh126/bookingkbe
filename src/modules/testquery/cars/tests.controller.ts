import { NextFunction, request, Request, response, Response } from "express";

import { TokenData } from "@modules/auth";
import TestsService from "./tests.services";

export default class TestController {
    private testService = new TestsService();
    public testQuery = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const route = req.query.route as string;
            const journey_date = req.query.journey_date as string;
            const pickup_point = req.query.pickup_point as string;
            const dropoff_point = req.query.dropoff_point as string;
            const data = await this.testService.getSearchBooking(
                journey_date,
                route,
                pickup_point,
                dropoff_point
            );
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    };

    public testSendMail = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {

            const data = await this.testService.testSendMail();
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    };
}
