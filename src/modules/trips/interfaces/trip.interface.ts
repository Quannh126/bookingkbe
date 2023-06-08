import { ICar } from "@modules/cars";
import { ObjectId } from "mongoose";

export default interface ITrip {
    _id?: ObjectId;
    pickup_point: Array<IPointDetail>;
    dropoff_point: Array<IPointDetail>;
    from_id: string;
    to_id: string;
    car: ICar;
    departure_time: string;
    destination_time: string;
    seats_booked: Array<number>;
    fare: number;
    sell_type: string;
    car_id: string;
}
export interface IPointDetail {
    district_id: number;
    point_id: number;
}
