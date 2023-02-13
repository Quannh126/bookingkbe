import { ICar } from "@modules/cars";
import mongoose, { Schema, model } from "mongoose";
import ITrip, { IPointDetail } from "./interfaces/trip.interface";
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

const CarSchema = new Schema<ICar>({
    name: {
        type: String,
        required: true,
    },
    type_car: {
        type: String,
        required: true,
    },
    license_plate: {
        type: String,
        required: true,
    },
    capacity: {
        type: String,
        required: true,
    },
    driver_name: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        required: false,
    },
});
const TripSchema = new Schema<ITrip & mongoose.Document>({
    from_id: {
        type: String,
        required: true,
    },
    to_id: {
        type: String,
        required: true,
    },
    dropoff_point: {
        type: [PointSchema],
        required: true,
    },
    pickup_point: {
        type: [PointSchema],
        require: true,
    },
    car: {
        type: CarSchema,
        required: true,
    },
    departure_time: {
        type: String,
        required: true,
    },
    destination_time: {
        type: String,
        required: true,
    },

    seats_booked: {
        type: [Number],
        required: true,
    },
    fare: {
        type: Number,
        required: true,
    },
    sell_type: {
        type: String,
        required: true,
    },
});
const Trip = model<ITrip & mongoose.Document>("Trips", TripSchema);
export default Trip;
