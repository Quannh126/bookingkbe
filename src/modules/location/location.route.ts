import { Router } from "express";
import { Route } from "@core/interfaces";

import { authMiddleware, validateMiddleware } from "@core/middlewares";
import LocationController from "./location.controller";
import CreateLineDTO from "./dto/add_point.dto";
import CreateLocationDTO from "./dto/create_location.dto";
import AddPointDTO from "./dto/add_point.dto";
import AddDistrictDTO from "./dto/add_district.dto";

export default class LocationRoute implements Route {
    public path = "/api/admin/locations";
    public router = Router();

    public LocationController = new LocationController();

    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        //1
        this.router.post(
            this.path,
            //authMiddleware,
            validateMiddleware(CreateLocationDTO, true),
            this.LocationController.addLocation
        );

        this.router.get(
            this.path,
            //authMiddleware,
            this.LocationController.getAll
        );

        this.router.delete(
            this.path + "/:province_id/:district_id/:point_id",
            //authMiddleware,
            this.LocationController.removePoint
        );
        this.router.delete(
            this.path + "/:province_id/:district_id",
            //authMiddleware,
            this.LocationController.removeDistrict
        );
        //4
        this.router.put(
            this.path + "/:province_id/:district_id",
            // authMiddleware,
            validateMiddleware(AddPointDTO, true),
            this.LocationController.addPoint
        );

        //4
        this.router.put(
            this.path + "/:province_id",
            // authMiddleware,
            validateMiddleware(AddDistrictDTO, true),
            this.LocationController.addDistrict
        );
        //5
        this.router.get(
            this.path + "/options",
            this.LocationController.getListProvince
        );
        //6
        this.router.get(
            this.path + "/options/:province_id",
            this.LocationController.getListDistrict
        );
        // //7
        // this.router.get(
        //     this.path + "/options/:province_id/:district_id",
        //     this.LocationController.getListDistrict
        // );
        //8
        this.router.get(
            this.path + "/options/:province_id/:district_id",
            this.LocationController.getListPoint
        );

        this.router.get(
            this.path + "/detail/:province_id",
            this.LocationController.getDetailProvinde
        );
        this.router.get(
            this.path + "/points/:route",
            this.LocationController.getListPointByRoute
        );
    }
}
