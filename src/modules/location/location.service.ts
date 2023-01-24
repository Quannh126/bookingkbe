import { Location, ILocation } from "@modules/location";
import { isEmptyObject } from "@core/utils/helper";
import { HttpException } from "@core/exceptions";
import { IPagination, KeyValue } from "@core/interfaces";
import AddPointDTO from "./dto/add_point.dto";
import { IDistrict, IPoint } from "./interfaces/location.interface";
import CreateLocationDTO from "./dto/create_location.dto";
import AddDistrictDTO from "./dto/add_district.dto";
import AddLocationDTO from "./dto/add_location.dto";

// import ILineDetail from "./interfaces/carDetail.interface";

class LocationService {
    public locationModel = Location;

    public async addPoint(data: AddPointDTO): Promise<ILocation> {
        if (isEmptyObject(data)) {
            throw new HttpException(400, "Model is empty");
        }
        const location = await this.locationModel.findOne({
            code: data.province_id,
        });
        if (!location) {
            throw new HttpException(400, "Location is empty");
        }
        const arr = location.district[data.district_id!].point;
        const { length } = location.district[Number(data.district_id)].point;
        const id = length + 1;
        const found = arr.some((item: IPoint) => item.name === data.name);
        let dataPush: IPoint = {
            code: id,
            name: data.name!,
            address: data.address!,
        };
        if (!found) location.district[data.district_id!].point.push(dataPush);
        const result = await this.locationModel.findOneAndReplace(
            { code: data.province_id },
            { ...location }
        );
        if (!result) {
            throw new HttpException(400, "Error");
        }

        return result;
    }

    public async addLocation(data: AddLocationDTO): Promise<ILocation> {
        if (isEmptyObject(data)) {
            throw new HttpException(400, "Data is empty");
        }
        const location = await this.locationModel.find({}).exec();
        const dataCreate: ILocation = {
            name: data.name!,
            code: location.length + 1,
            division_type: data.division_type!,
            district: [],
        };
        const result = await this.locationModel.create(dataCreate);
        return result;
    }
    public async addDistrict(data: AddDistrictDTO): Promise<ILocation> {
        if (isEmptyObject(data)) {
            throw new HttpException(400, "Model is empty");
        }
        const location = await this.locationModel.findOne({
            code: data.province_id,
        });
        if (!location) {
            throw new HttpException(400, "Location is empty");
        }
        const arr = location.district;
        const { length } = location.district;
        const id = length + 1;
        let dataPush: IDistrict = {
            code: id,
            division_type: data.district_type!,
            name: data.district_name!,
            province_code: data.province_id!,
            point: [],
        };
        const found = arr.some(
            (item: IDistrict) => item.name === data.district_name
        );
        if (!found) location.district.push(dataPush);
        const result = await this.locationModel.findOneAndReplace(
            { code: data.province_id },
            { ...location }
        );
        if (!result) {
            throw new HttpException(400, "Error");
        }

        return result;
    }
    public async getAllPoint(
        province_id: number,
        district_id: number
    ): Promise<IPoint[]> {
        if (!province_id || !district_id) {
            return [];
        }
        const list = await this.locationModel
            .findOne({ code: province_id })
            .exec();
        if (!list) {
            return [];
        }
        const result = list.district[district_id].point;
        return result;
    }
    public async getListPoint(
        province_id: number,
        district_id: number
    ): Promise<KeyValue[]> {
        if (!province_id || !district_id) {
            return [];
        }
        const list = await this.locationModel
            .findOne({ code: province_id })
            .exec();
        if (!list) {
            return [];
        }
        const listPoint = list.district[district_id].point;
        const result = listPoint.map(({ code: key, name: value }) => ({
            key: key.toString(),
            value,
        }));
        return result;
    }
    public async getListProvince(): Promise<KeyValue[]> {
        const list = await this.locationModel
            .find({}, { code: 1, name: 1 })
            .exec();
        if (!list) {
            return [];
        }
        let result = await list.map(({ code: key, name: value }) => ({
            key: key.toString(),
            value,
        }));
        //result.push({ key: "", value: "" });
        return result;
    }

    public async getListDistrict(province_id: number): Promise<KeyValue[]> {
        const list = await this.locationModel
            .findOne({ code: province_id })
            .exec();
        if (!list) return [];
        const result = list.district.map(({ code: key, name: value }) => ({
            key: key.toString(),
            value,
        }));
        return result;
    }

    public async addFullLocation(data: CreateLocationDTO): Promise<ILocation> {
        let location = {};
        const check = await this.locationModel
            .find({})
            .sort({ _id: -1 })
            .limit(1);
        console.log(check);
        if (!check || check.length == 0) {
            location = {
                name: data.province_name,
                division_type: data.province_type,
                code: 1,
                district: [
                    {
                        name: data.district_name,
                        code: 1,
                        division_type: data.district_type,
                        province_code: 1,
                        point: [
                            {
                                name: data.name,
                                code: 1,
                                address: data.address,
                            },
                        ],
                    },
                ],
            };
        } else {
            location = {
                name: data.province_name,
                code: check[0].code + 1,
                division_type: data.province_type,
                district: [
                    {
                        name: data.district_name,
                        code: 1,
                        division_type: data.district_type,
                        province_code: 1,
                        point: [
                            {
                                name: data.name,
                                code: 1,
                                address: data.address,
                            },
                        ],
                    },
                ],
            };
        }
        const result = await this.locationModel.create(location);
        return result;
    }
    public async getAllLocation(): Promise<ILocation[]> {
        const reuslt = await this.locationModel.find().exec();
        return reuslt;
    }
    public async deletePoint(
        province_id: number,
        point_id: number,
        district_id: number
    ): Promise<ILocation> {
        const location = await this.locationModel.findOne({
            code: province_id,
        });
        if (!location) {
            throw new HttpException(400, "Id not exist");
        }
        const arr = location.district[Number(district_id)].point;
        const { length } = arr;
        let i = length;
        while (i--) {
            if (arr[i].code === Number(point_id)) {
                location.district[Number(district_id)].point.splice(i, 1);
                break;
            }
        }
        const result = await this.locationModel.findOneAndReplace(
            {
                code: province_id,
            },
            { ...location }
        );

        return result!;
    }
}
export default LocationService;
