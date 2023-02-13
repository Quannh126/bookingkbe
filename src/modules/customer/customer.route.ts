import { Router } from "express";
import { Route } from "@core/interfaces";
import CustomerController from "./customer.controller";
import { authMiddleware, validateMiddleware } from "@core/middlewares";
import { AddCustomerDTO, UpdateCustomerDTO } from "./dto";

export default class CustomerRoute implements Route {
    public path = "/api/admin/customer";
    public router = Router();

    public customerController = new CustomerController();

    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post(
            this.path,
            authMiddleware,
            validateMiddleware(AddCustomerDTO, true),
            this.customerController.addCustomer
        );

        this.router.get(this.path, this.customerController.getAllCustomer);

        this.router.get(
            this.path + "/paging/:page",
            this.customerController.getAllPaging
        );

        this.router.put(
            this.path,
            authMiddleware,
            validateMiddleware(UpdateCustomerDTO, true),
            this.customerController.updateCustomer
        );

        this.router.delete(
            this.path + "/:customer_id",
            authMiddleware,
            this.customerController.deleteCustomer
        );
        // this.router.get(
        //     this.path + "/search",
        //     this.customerController.getCustomerById
        // );
        this.router.get(
            this.path + "/:customer_id",
            this.customerController.getCustomerById
        );
    }
}
