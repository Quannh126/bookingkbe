import { ICustomer } from "@modules/customer";
import { IPointDetail } from "@modules/trips/interfaces/trip.interface";

export default interface IBooking {
    _id?: string;
    trip_id: string;
    customer: ICustomer;
    seat: string;
    // seats_booked: [Number];
    // amount_seat: Number;
    pickup_point: string;
    dropoff_point: string;
    note: string;
    fare: string;
    journey_date: Date;
    status: string;
    ticket_code: string;
    status_payment: string;
    status_ticket: string;
}
