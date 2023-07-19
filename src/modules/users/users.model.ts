import mongoose, { Schema, model } from "mongoose";
import IUser from "./users.interface";

const UserSchema = new Schema<IUser & mongoose.Document>({
    fullname: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },

    username: {
        unique: true,
        index: true,
        type: String,
        require: false,
    },
    role: {
        type: String,
        enum: ["Admin", "Manager", "Employee"],
        require: false,
        default: "USER",
    },
    resetPasswordLink: {
        type: String,
        require: true,
    },
    isVerified: {
        type: Boolean,
        require: true,
    },
    date: {
        type: Date,
        require: false,
    },
    avatar: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        require: true,
        default: "Active",
        enum: ["Active", "Inactive"],
    },
});
const User = model<IUser & mongoose.Document>("User", UserSchema);
export default User;
