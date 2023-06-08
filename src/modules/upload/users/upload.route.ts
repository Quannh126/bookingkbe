import { Router } from "express";
import { Route } from "@core/interfaces";
import UploadController from "./upload.controller";
import { authMiddleware, validateMiddleware } from "@core/middlewares";
import RegisterDto from "./dtos/register.dto";
export default class UploadRoute implements Route {
    public path = "/api/upload";
    public router = Router();

    public uploadController = new UploadController();

    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.get(
            this.path + "/get-uploaded-img/:car_id",
            this.uploadController.getUrlUpload
        );
        this.router.get(
            this.path + "/:car_id/:name_file",
            this.uploadController.getUrlUpload
        );
    }
}
