import { ICar } from "@modules/cars";

export default interface ITrip {
    pickup_point: Array<IPointDetail>;
    dropoff_point: Array<IPointDetail>;
    car: ICar;
    departure_time: string;
    destination_time: string;
    duration: number;
    seats_booked: Array<number>;
    fare: number;
    sell_type: string;
}
export interface IPointDetail {
    province_id: number;
    district_id: number;
    point_id: number;
    name: string;
    address: string;
}
