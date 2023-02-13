import { NextFunction, request, Request, response, Response } from "express";
import { CustomerService, ICustomerDetial } from "@modules/customer";
import { TokenData } from "@modules/auth";
import UpdateCustomerDTO from "./dto/update-customer.dto";
import AddCustomerDTO from "./dto/add-customer.dto";

export default class CustomerController {
    private customerService = new CustomerService();
    public addCustomer = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data: AddCustomerDTO = req.body;
            const result = await this.customerService.addCustomer(data);
            res.status(201).json({ msg: "success" });
        } catch (error) {
            next(error);
        }
    };

    public getAllCustomer = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data = await this.customerService.getAllCustomer();

            res.status(201).json(data);
        } catch (error) {
            next(error);
        }
    };

    public getCustomerById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { customer_id } = req.params;
            const data = await this.customerService.getCustomer(customer_id);
            res.status(201).json(data);
        } catch (error) {
            next(error);
        }
    };
    public getAllPaging = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const page: number = Number(req.params.page);
            const keyword: string = req.query.toString();
            const customers = await this.customerService.getAllPaging(
                keyword,
                page
            );
            res.status(201).json(customers);
        } catch (error) {
            next(error);
        }
    };

    public deleteCustomer = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { customer_id } = req.params;
            const result = await this.customerService.deleteCustomer(
                customer_id
            );
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };
    public updateCustomer = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data: UpdateCustomerDTO = req.body;
            const result = await this.customerService.updateCustomer(data);

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };
    public getCustomerByPhone = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            // const phonenumber: string = req.query.p as string;
            const result =
                await this.customerService.getCustomerByPhoneNumber();

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };
}
