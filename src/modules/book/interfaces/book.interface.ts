import { ICustomer } from "@modules/customer";
import { IPointDetail } from "@modules/trips/interfaces/trip.interface";

export default interface IBooking {
    _id?: string;
    trip_id: string;
    customer: ICustomer;
    seat: string;
    pickup_point: IPointDetail;
    dropoff_point: IPointDetail;
    note: string;
    fare: string;
    journey_date: Date;
    status: string;
    status_payment: string;
}
