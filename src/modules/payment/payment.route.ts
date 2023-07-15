import { Router } from "express";
import { Route } from "@core/interfaces";

import {
    authMiddleware,
    validateMiddleware,
    verifyRolesMiddleware,
} from "@core/middlewares";

import PaymentController from "./payment.controller";

import { CreatePaymentDTO, CheckSumDTO } from "./dto";

export default class PaymentRoute implements Route {
    public path = "/payment";
    public router = Router();

    public paymentController = new PaymentController();

    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post(
            this.path + "/create-payment-url",
            validateMiddleware(CreatePaymentDTO, true),
            this.paymentController.createPaymentURL
        );
        this.router.post(
            this.path + "/check-sum",
            validateMiddleware(CheckSumDTO, true),
            this.paymentController.checkSum
        );
        this.router.get(
            this.path + "/check-sum",
            validateMiddleware(CheckSumDTO, true),
            this.paymentController.checkSum
        );
    }
}
