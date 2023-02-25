import mongoose, { Schema, model } from "mongoose";
import ICustomer from "./interfaces/customer.interface";

const CustomerSchema = new Schema<ICustomer & mongoose.Document>({
    name: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    times_booking: {
        type: Number,
        default: 0,
    },
});
const Customer = model<ICustomer & mongoose.Document>(
    "Customer",
    CustomerSchema
);
export default Customer;
