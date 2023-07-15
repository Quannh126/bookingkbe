import { Location, ILocation } from "@modules/location";
import { isEmptyObject } from "@core/utils/helper";
import { HttpException } from "@core/exceptions";
import { IPagination, NameValue } from "@core/interfaces";
import AddPointDTO from "./dto/add_point.dto";
import {
    IDistrict,
    IPoint,
    ILocationGrouped,
} from "./interfaces/location.interface";
import CreateLocationDTO from "./dto/create_location.dto";
import AddDistrictDTO from "./dto/add_district.dto";
import AddLocationDTO from "./dto/add_location.dto";
import e from "express";

// import ILineDetail from "./interfaces/carDetail.interface";

class LocationService {
    public locationModel = Location;

    public async addPoint(
        data: AddPointDTO,
        province_id: String,
        district_id: String
    ): Promise<ILocation> {
        if (isEmptyObject(data)) {
            throw new HttpException(400, "Model is empty");
        }
        const location = await this.locationModel.findOne({
            code: Number(province_id),
        });
        if (!location) {
            throw new HttpException(400, "Location is empty");
        }
        const arr = location.district[Number(district_id) - 1].point;
        const { length } = location.district[Number(district_id) - 1].point;
        const id = length + 1;
        const found = arr.some((item: IPoint) => item.name === data.name);
        let dataPush: IPoint = {
            code: id,
            name: data.name!,
            address: data.address!,
        };
        if (!found) {
            const result = await this.locationModel.findOneAndUpdate(
                { code: province_id, "district.code": district_id },
                { $push: { "district.$.point": dataPush } }
            );
            if (!result) {
                throw new HttpException(400, "Error");
            }
            return result;
        } else {
            throw new HttpException(409, "Item exist");
        }
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
    public async addDistrict(
        data: AddDistrictDTO,
        province_id: String
    ): Promise<ILocation> {
        if (isEmptyObject(data)) {
            throw new HttpException(400, "Model is empty");
        }
        const location = await this.locationModel.findOne({
            code: province_id,
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
            province_code: Number(province_id),
            point: [],
        };
        const found = arr.some(
            (item: IDistrict) => item.name === data.district_name
        );
        if (!found) {
            const result = await this.locationModel.findOneAndUpdate(
                { code: province_id },
                { $push: { district: dataPush } }
            );
            if (!result) {
                throw new HttpException(400, "Error");
            }

            return result;
        } else {
            throw new HttpException(409, "Item exist");
        }
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
    ): Promise<Array<NameValue>> {
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
        const result = listPoint.map(({ code: value, name: name }) => ({
            value: value.toString(),
            name,
        }));
        return result;
    }
    public async getListProvince(): Promise<Array<NameValue>> {
        const list = await this.locationModel
            .find({}, { code: 1, name: 1 })
            .exec();
        if (!list) {
            return [];
        }
        let result = await list.map(({ code: value, name: name }) => ({
            value: value.toString(),
            name,
        }));
        //result.push({ key: "", value: "" });
        return result;
    }

    public async getListDistrict(
        province_id: number
    ): Promise<Array<NameValue>> {
        const list = await this.locationModel
            .findOne({ code: province_id })
            .exec();
        if (!list) return [];
        const result = list.district.map(({ code: value, name: name }) => ({
            value: value.toString(),
            name,
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
        provinceCode: string,
        pointCode: string,
        districtCode: string
    ): Promise<ILocation> {
        // const result = await this.locationModel.findOneAndUpdate(
        //     {
        //         code: provinceCode,
        //         "district.code": districtCode,
        //     },
        //     { $pull: { district: { point: { code: pointCode } } } }
        // );
        const location = await this.locationModel
            .findOne({
                code: provinceCode,
            })
            .exec();
        if (!location) {
            throw new HttpException(400, "Id not exist");
        }
        const district = location.district.find(
            (dist) => dist.code === parseInt(districtCode)
        );

        const pointIndex = district?.point.findIndex(
            (point) => point.code === parseInt(pointCode)
        );
        if (pointIndex === -1) {
            console.log("Point not found");
            throw new HttpException(400, "Point not found");
        }
        district?.point.splice(pointIndex!, 1);

        district?.point.forEach((point, index) => {
            point.code = index + 1;
        });
        const result = await this.locationModel.findOneAndUpdate(
            {
                code: provinceCode,
                "district.code": districtCode,
            },
            { $set: { "district.$.point": [...district!.point] } }
        );

        if (!result) {
            throw new HttpException(400, "Id not exist");
        }
        return result;
    }

    public async deleteDistrict(
        province_id: string,
        district_id: string
    ): Promise<ILocation> {
        const result = await this.locationModel.findOneAndUpdate(
            {
                code: province_id,
                "district.code": district_id,
            },
            { $pull: { district: { code: district_id } } }
        );

        if (!result) {
            throw new HttpException(400, "Id not exist");
        }
        return result;
    }
    public async getDetailProvince(
        province_id: string
    ): Promise<Array<Array<NameValue>> | {}> {
        const location = await this.locationModel
            .findOne({ code: province_id })
            .exec();
        if (!location) return {};
        let listOption = [] as Array<Array<NameValue>>;
        listOption.push([]);
        location.district.forEach((district: IDistrict) => {
            let option = district.point.map(({ code: value, name: name }) => ({
                value: value.toString(),
                name,
            }));
            listOption.push(option);
        });
        console.log(listOption);

        return listOption;
    }
    public async getPointByRoute(route: string): Promise<{
        dropoff: Array<NameValue>;
        pickup: Array<NameValue>;
    }> {
        const data = route.split("-");

        const listProvince1 = await this.locationModel
            .findOne({ code: data[0] })
            .exec();
        const listProvince2 = await this.locationModel
            .findOne({ code: data[1] })
            .exec();
        if (!listProvince1 || !listProvince2) {
            return { dropoff: [], pickup: [] };
        }
        let listDropoff = [{ name: "-Tất cả-", value: "" }] as Array<NameValue>;
        let listPickup = [{ name: "-Tất cả-", value: "" }] as Array<NameValue>;
        listProvince2.district.forEach((district: IDistrict) => {
            const listPoint = district.point;
            let resultMap = listPoint.map(({ code: value, name: name }) => ({
                value: district.code + "-" + value,
                name: district.name + "-" + name,
            }));
            listDropoff.push(...resultMap);
        });
        listProvince1.district.forEach((district: IDistrict) => {
            const listPoint = district.point;
            let resultMap = listPoint.map(({ code: value, name: name }) => ({
                value: district.code + "-" + value,
                name: district.name + "-" + name,
            }));
            listPickup.push(...resultMap);
        });

        return { dropoff: listDropoff, pickup: listPickup };
    }

    public async getGroupedLocation(): Promise<ILocationGrouped[]> {
        const all = await this.locationModel
            .find({})
            // .select("district.point.code district.point.name")
            .exec();
        console.log(all);
        let result = [] as ILocationGrouped[];
        const transformedData = all.map((location) => {
            const header = location.name;
            const point = location.district.flatMap((district) => {
                const districtCode = district.code;
                return district.point.map((point) => ({
                    code_group: `${location.code}-${districtCode}-${point.code}`,
                    name: point.name,
                }));
            });
            return { header, point };
        });
        // all.forEach((location: any) => {
        //     location.district.forEach((district: any) => {
        //         district.point.forEach((point: any) => {
        //             const codeGroup = `${location.code}-${district.code}-${point.code}`;
        //             const groupedLocation: ILocationGrouped = {
        //                 code_group: codeGroup,
        //                 name: point.name,
        //                 sub_header: `${location.name}`,
        //             };
        //             result.push(groupedLocation);
        //         });
        //     });
        // });
        return transformedData;
    }
}
export default LocationService;
