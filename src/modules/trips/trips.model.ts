import { ICar } from "@modules/cars";
import mongoose, { Schema, model } from "mongoose";
import ITrip, { IPointDetail } from "./interfaces/trip.interface";
const PointSchema = new Schema<IPointDetail>({
    province_id: {
        type: Number,
        require: true,
    },
    district_id: {
        type: Number,
        require: true,
    },
    point_id: {
        type: Number,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
});

const CarSchema = new Schema<ICar>({
    name: {
        type: String,
        require: true,
    },
    typeCar: {
        type: String,
        require: true,
    },
    detail: {
        type: String,
    },
    imagePath: {
        type: String,
    },
    licensePlate: {
        type: String,
        require: true,
    },
    capacity: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    driver_id: {
        type: String,
        require: true,
    },
    driver2_id: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        require: true,
    },
});
const TripSchema = new Schema<ITrip & mongoose.Document>({
    pickup_point: {
        type: [PointSchema],
        require: true,
    },

    dropoff_point: {
        type: [PointSchema],
        required: true,
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
    duration: {
        type: Number,
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
