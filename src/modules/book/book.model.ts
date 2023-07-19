import { ICustomer } from "@modules/customer";
import { IPointDetail } from "@modules/trips/interfaces/trip.interface";
import mongoose, { Schema, model } from "mongoose";
import IBooking from "./interfaces/book.interface";
import ICar from "./interfaces/book.interface";
const CustomerSchema = new Schema<ICustomer>({
    _id: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
});
const PointSchema = new Schema<IPointDetail>({
    district_id: {
        type: Number,
        require: true,
    },
    point_id: {
        type: Number,
        require: true,
    },
});
const BookingSchema = new Schema<IBooking & mongoose.Document>({
    trip_id: {
        type: String,
        required: true,
    },
    customer: {
        type: CustomerSchema,
        required: true,
    },
    seat: {
        type: String,
        required: true,
    },
    pickup_point: {
        type: String,
        required: true,
    },
    dropoff_point: {
        type: String,
        required: true,
    },
    journey_date: {
        type: Date,
        required: true,
    },
    fare: {
        type: String,
        required: true,
    },
    note: {
        type: String,
    },
    ticket_code: {
        type: String,
        required: true,
    },
    status_payment: {
        type: String,
        required: true,
    },

    status_ticket: {
        type: String,
        require: true,
        enum: ["Reserved", "Paid", "Cancelled"],
        default: "Reserved",
    },
});
const Booking = model<IBooking & mongoose.Document>("Booking", BookingSchema);
export default Booking;
