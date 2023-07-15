import { Router } from "express";
import { Route } from "@core/interfaces";
import CustomerController from "./customer.controller";
import {
    authMiddleware,
    validateMiddleware,
    verifyRolesMiddleware,
} from "@core/middlewares";
import { AddCustomerDTO, UpdateCustomerDTO } from "./dto";
import { rolesMap } from "@core/utils/roles";

export default class CustomerRoute implements Route {
    public path = "/customer";
    public router = Router();

    public customerController = new CustomerController();

    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post(
            this.path,
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            validateMiddleware(AddCustomerDTO, true),
            this.customerController.addCustomer
        );

        this.router.get(
            this.path,
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            this.customerController.getAllCustomer
        );

        this.router.get(
            this.path + "/paging/:page",
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            this.customerController.getAllPaging
        );

        this.router.put(
            this.path,
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            validateMiddleware(UpdateCustomerDTO, true),
            this.customerController.updateCustomer
        );

        this.router.delete(
            this.path + "/:customer_id",
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            this.customerController.deleteCustomer
        );
        // this.router.get(
        //     this.path + "/search",
        //     this.customerController.getCustomerById
        // );
        this.router.get(
            this.path + "/:customer_id",
            authMiddleware,
            verifyRolesMiddleware(rolesMap[this.path]),
            this.customerController.getCustomerById
        );
    }
}
