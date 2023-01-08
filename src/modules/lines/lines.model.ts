import mongoose, { Schema, model } from "mongoose";
import ILine from "./interfaces/lines.interface";
const LineSchema = new Schema<ILine & mongoose.Document>({
    // name_line: string;
    // arrival: string;
    // departure: string;
    // to: string;
    // from: string;
    name_line: {
        type: String,
        required: true,
    },
    arrival: {
        type: String,
        required: true,
    },
    departure: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
});
const Line = model<ILine & mongoose.Document>("Lines", LineSchema);
export default Line;
