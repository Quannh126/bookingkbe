import { NextFunction, request, Request, response, Response } from "express";
import { LocationService } from "@modules/location";
import AddPointDTO from "./dto/add_point.dto";
import CreateLocationDTO from "./dto/create_location.dto";
import AddDistrictDTO from "./dto/add_district.dto";

export default class LocationController {
    private locationService = new LocationService();
    public addPoint = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data: AddPointDTO = req.body;
            const { province_id, district_id } = req.params;
            console.log(province_id, district_id, data);
            await this.locationService.addPoint(data, province_id, district_id);
            res.status(201).json({ msg: "Success" });
        } catch (error) {
            next(error);
        }
    };
    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const listPoint = await this.locationService.getAllLocation();
            res.status(200).json(listPoint);
        } catch (error) {
            next(error);
        }
    };

    public getAllPoint = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { province_id, district_id } = req.params;
            const listPoint = await this.locationService.getAllPoint(
                Number(province_id),
                Number(district_id)
            );
            res.status(200).json(listPoint);
        } catch (error) {
            next(error);
        }
    };

    public addLocation = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data: CreateLocationDTO = req.body;
            const listLine = await this.locationService.addFullLocation(data);
            res.status(200).json(listLine);
        } catch (error) {
            next(error);
        }
    };

    public getListPoint = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { province_id, district_id } = req.params;
            const result = await this.locationService.getListPoint(
                Number(province_id),
                Number(district_id)
            );
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };
    public getListProvince = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            // const data: CreateLineDTO = req.body;
            const result = await this.locationService.getListProvince();
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };
    public getGroupedLocaltion = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            // const data: CreateLineDTO = req.body;
            const result = await this.locationService.getGroupedLocation();
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };
    public getListDistrict = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { province_id } = req.params;
            const result = await this.locationService.getListDistrict(
                Number(province_id)
            );
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    public addDistrict = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { province_id } = req.params;
            const data: AddDistrictDTO = req.body;
            const result = await this.locationService.addDistrict(
                data,
                province_id
            );
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    public removePoint = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { province_id, district_id, point_id } = req.params;

            const result = await this.locationService.deletePoint(
                province_id,
                point_id,
                district_id
            );

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    public removeDistrict = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { province_id, district_id } = req.params;

            const result = await this.locationService.deleteDistrict(
                province_id,
                district_id
            );
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    public getDetailProvinde = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { province_id } = req.params;
            const result = await this.locationService.getDetailProvince(
                province_id
            );
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    public getListPointByRoute = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { route } = req.params;
            const result = await this.locationService.getPointByRoute(route);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };
}
