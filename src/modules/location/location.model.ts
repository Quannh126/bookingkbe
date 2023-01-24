import mongoose, { Schema, model } from "mongoose";
import ILocation, { IDistrict, IPoint } from "./interfaces/location.interface";
const PointSchema = new Schema<IPoint>({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
});
const DistrictSchema = new Schema<IDistrict>({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: Number,
        required: true,
    },
    division_type: {
        type: String,
        required: true,
    },
    province_code: {
        type: Number,
        required: true,
    },
    point: {
        type: [PointSchema],
        default: [],
    },
});
const LocationSchema = new Schema<ILocation & mongoose.Document>({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: Number,
        required: true,
    },
    division_type: {
        type: String,
        required: true,
    },
    district: {
        type: [DistrictSchema],
        default: [],
    },
});
const Location = model<ILocation & mongoose.Document>(
    "Locations",
    LocationSchema
);
export default Location;
