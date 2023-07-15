import { ICar } from "@modules/cars";
import { ICustomer } from "@modules/customer";
import { IPointDetail } from "@modules/trips/interfaces/trip.interface";
import IBooking from "./book.interface";
type ISeatDetail = {
    seat: string;
    customer: ICustomer;
    booking: IBooking;
};
export default interface IBookingTrip {
    _id: string;
    pickup_point: IPointDetail;
    dropoff_point: IPointDetail;
    trip_id: string;
    car: ICar;
    departure_time: string;
    destination_time: string;
    fare: string;
    sell_type: string;
    seat_booked: string;
    seat_detail: Array<ISeatDetail>;
}
