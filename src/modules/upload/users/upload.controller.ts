import { NextFunction, Request, Response } from "express";
import UploadService from "./upload.service";
export default class UploadController {
    private uploadService = new UploadService();

    public getUrlUpload = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const result = await this.uploadService.generrateUpload(
                req.params.car_id,
                req.params.name_file
            );
            res.status(200).json({ url: result });
        } catch (error) {
            next(error);
        }
    };

    public getUploadedURL = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const result = await this.uploadService.generrateUpload(
                req.params.car_id,
                req.params.name_file
            );
            res.status(200).json({ url: result });
        } catch (error) {
            next(error);
        }
    };
}
