import { NextFunction, request, Request, response, Response } from "express";
import { LinesService } from "@modules/lines";

import ILine from "./interfaces/lines.interface";
import CreateLineDTO from "./dto/create_lines.dto";

export default class LineController {
    private lineService = new LinesService();
    public addLine = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data: CreateLineDTO = req.body;
            const listLine = await this.lineService.addLine(data);
            res.status(201).json(listLine);
        } catch (error) {
            next(error);
        }
    };
    public getOptionLine = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const listLine = await this.lineService.getOptionsLine();
            res.status(200).json(listLine);
        } catch (error) {
            next(error);
        }
    };
    public getListLine = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const carid: string = req.params.carid;
            const listLine = await this.lineService.getAll();
            res.status(200).json(listLine);
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
            const lineId = req.params.carid;
            const result = await this.lineService.deleteLine(lineId);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };
    public updateLine = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data: CreateLineDTO = req.body;
            const result = await this.lineService.updateLine(data);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };
}
