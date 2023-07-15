import { HttpException } from "@core/exceptions";
import { NameValue } from "@core/interfaces";
import { convertDateToString } from "@core/utils";
import { isEmptyObject } from "@core/utils/helper";
import { Car } from "@modules/cars";
import { IDistrict } from "@modules/location/interfaces/location.interface";
import { ITrip, Trip } from "@modules/trips";
import { Location } from "@modules/location";
import e from "express";
import CreateTripDTO from "./dto/create_trips.dto";
import UpdateTripDTO from "./dto/update_trip.dto";
import { Logger } from "@core/utils";
import { Car_Status } from "@modules/cars/interfaces/status";

// import UpdateTripDTO from "./dto/update_trip.dto";

export default class TripService {
    public tripModel = Trip;
    public carModel = Car;
    public locationModel = Location;
    public async getAllTrip(): Promise<ITrip[]> {
        const trips = await this.tripModel.find({}).exec();
        if (!trips) {
            return [] as ITrip[];
        }
        return trips;
    }
    // Thêm chuyến
    public async addTrip(data: CreateTripDTO): Promise<ITrip> {
        if (isEmptyObject(data)) {
            throw new HttpException(400, "Data is empty");
        }
        const carDetail = await this.carModel
            .findOneAndUpdate({ _id: data.car_id }, { status: "" })
            .exec();
        if (!carDetail) {
        }

        let dataCreate = {
            to_id: data.to_id,
            from_id: data.from_id,
            pickup_point: data.pickup_point,
            dropoff_point: data.dropoff_point,
            car: carDetail,
            departure_time: data.departure_time,
            destination_time: data.destination_time,
            seats_booked: [],
            fare: data.fare,
            sell_type: data.sell_type,
            car_id: data.car_id,
        };

        const trip = await this.tripModel.create(dataCreate);
        if (!trip) {
            throw new HttpException(400, "Faile Create");
        } else {
        }
        return trip;
    }

    public async getTripDetail(trip_id: string): Promise<ITrip> {
        const trip = await this.tripModel.findOne({ _id: trip_id });
        // console.log(trip);
        if (!trip) {
            throw new HttpException(400, "Cant find this");
        }
        return trip;
    }

    public async deleteTrip(id: string): Promise<ITrip> {
        const trip = await this.tripModel.findOneAndUpdate(
            { _id: id },
            { trip_status: false }
        );

        if (!trip) {
            throw new HttpException(400, "Cant find this");
        }

        return trip;
    }

    public async updateTrip(data: UpdateTripDTO): Promise<ITrip> {
        const olderCar = await this.carModel
            .findOneAndUpdate(
                { _id: data.car?._id },
                { status: Car_Status.YetToStart }
            )
            .exec();
        const carData = await this.carModel.findOneAndUpdate(
            { _id: data.car_id },
            { status: Car_Status.Running }
        );

        if (!carData || !olderCar) {
            throw new HttpException(400, "Cant find car");
        }

        data.car = carData;
        const trip = await this.tripModel.findOneAndUpdate(
            { _id: data._id },
            { ...data }
        );
        if (!trip) {
            throw new HttpException(400, "Cant find this");
        }

        return trip;
    }
    public async getSearchTrip(
        route: string,
        pickup: string,
        dropoff: string
    ): Promise<Array<ITrip>> {
        const from_id = route.split("-")[0];
        const to_id = route.split("-")[1];
        if (!pickup && !dropoff) {
            const list = await this.tripModel.find({ from_id, to_id }).exec();
            return list;
        }
        const list: Array<ITrip> = [];
        if (!pickup && dropoff) {
            let info = dropoff.split("-");
            const district_id = Number(info[0]);
            const point_id = Number(info[1]);
            const list = await this.tripModel
                .find({
                    from_id,
                    to_id,

                    dropoff_point: { $elemMatch: { district_id, point_id } },
                })
                .exec();
            return list;
        }
        if (pickup && !dropoff) {
            let info = pickup.split("-");
            const district_id = Number(info[0]);
            const point_id = Number(info[1]);
            const list = await this.tripModel
                .find({
                    from_id,
                    to_id,

                    pickup_point: { $elemMatch: { district_id, point_id } },
                })
                .exec();
            return list;
        }
        if (pickup && dropoff) {
            let info = pickup.split("-");
            const district_id = Number(info[0]);
            const point_id = Number(info[1]);
            let info2 = dropoff.split("-");
            const district_id2 = Number(info2[0]);
            const point_id2 = Number(info2[1]);
            const find = {
                from_id: from_id,
                to_id: to_id,

                pickup_point: {
                    "$elemMatch": {
                        district_id: district_id,
                        point_id: point_id,
                    },
                },
                dropoff_point: {
                    "$elemMatch": {
                        district_id: district_id2,
                        point_id: point_id2,
                    },
                },
            };

            const list = await this.tripModel
                .find({
                    from_id: from_id,
                    to_id: to_id,

                    pickup_point: {
                        "$elemMatch": {
                            district_id: district_id,
                            point_id: point_id,
                        },
                    },
                    dropoff_point: {
                        "$elemMatch": {
                            district_id: district_id2,
                            point_id: point_id2,
                        },
                    },
                })
                .exec();
            return list;
        }
        console.log(list);
        return [] as Array<ITrip>;
    }

    public async getPickupAndDropoffOption(
        trip_id: string
    ): Promise<{ dropoff: Array<NameValue>; pickup: Array<NameValue> }> {
        //console.log(trip_id);
        const trip = await this.tripModel.findById(trip_id).exec();
        if (!trip) {
            throw new HttpException(400, "Cant find this");
        }
        const listProvince1 = await this.locationModel
            .findOne({ code: trip.from_id })
            .exec();
        const listProvince2 = await this.locationModel
            .findOne({ code: trip.to_id })
            .exec();
        if (!listProvince1 || !listProvince2) {
            return { dropoff: [], pickup: [] };
        }

        let listDropoff = [
            { name: "-Chọn điểm xuống-", value: "" },
        ] as Array<NameValue>;
        let listPickup = [
            { name: "-Chọn điểm đón-", value: "" },
        ] as Array<NameValue>;

        trip.dropoff_point.forEach((item) => {
            let resultMap = {
                value: item.district_id + "-" + item.point_id,
                name:
                    listProvince2.district[Number(item.district_id) - 1].name +
                    " - " +
                    listProvince2.district[Number(item.district_id) - 1].point[
                        Number(item.point_id) - 1
                    ].name,
            };

            listDropoff.push(resultMap);
        });
        trip.pickup_point.forEach((item) => {
            let resultMap = {
                value: item.district_id + "-" + item.point_id,
                name:
                    listProvince1.district[Number(item.district_id) - 1].name +
                    " - " +
                    listProvince1.district[Number(item.district_id) - 1].point[
                        Number(item.point_id) - 1
                    ].name,
            };

            listPickup.push(resultMap);
        });
        //console.log(listDropoff);

        return { dropoff: listDropoff, pickup: listPickup };
    }
}
