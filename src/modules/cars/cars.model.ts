import mongoose, { Schema, model } from "mongoose";
import ICar from "./interfaces/cars.interface";
const CarSchema = new Schema<ICar & mongoose.Document>({
    name: {
        type: String,
        required: true,
    },
    typeCar: {
        type: String,
        required: true,
    },
    imagePath: {
        type: String,
        required: false,
    },
    capacity: {
        type: String,
        required: false,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        required: false,
    },
    driver_id: {
        type: String,
        required: false,
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
