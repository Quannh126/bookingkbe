import mongoose, { Schema, model } from "mongoose";
import ICar from "./interfaces/cars.interface";
const CarSchema = new Schema<ICar & mongoose.Document>({
    name: {
        type: String,
        required: true,
    },
    type_car: {
        type: String,
        required: true,
    },
    imgPath: {
        type: String,
        default: "",
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
        default: "Yet To Start",
    },

    comment: [
        {
            user: {
                type: String,
            },
            text: {
                type: String,
            },
            star: {
                type: Number,
            },
            avatar: {
                type: String,
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});
const Car = model<ICar & mongoose.Document>("Cars", CarSchema);
export default Car;
