import mongoose, {Schema, model} from "mongoose"
import IUser from "./users.interface";
const UserSchema = new Schema<IUser & mongoose.Document>({
    name:{
        type: String,
        require: true,
    },
    
    phone: {
        type: String,
        unique: true,
        index: true, 
        require: true
    },
    address: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: false
    },
    info: {
        type: String,
        require: false
    },
    resetPasswordLink: {
        type: String,
        require: true
    },
    isVerified: {
        type: Boolean,
        require: true
    },
    salt: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: false
    },
    avatar: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});
const User = model<IUser & mongoose.Document>('User', UserSchema);
export default User;