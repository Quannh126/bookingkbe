import mongoose, {Schema, model} from "mongoose"
import ICar from "./interfaces/cars.inteface";
const CarSchema = new Schema<ICar & mongoose.Document>({
    name:{
        type: String,
        required: true,
    },
    
    type: {
        type:String,
        required: true
    },
    company:{
        type: String,
        required: true
    },
    policy:{
        type: String,
        required: false
    },
    imagePath: {
        type: String,
        required: false,
    },
    capacity: {
        type: String,
        required: false,
    },
    trips: [
        {
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
            phoneDriver: {
                type: String,
                required: true,
            },
            driverName: {
                type: String,
                required: true,
            },
            imagePath: {
                type: String,
                required: false,
            },
            fare: {
                type: String,
                required: false,
            },
            seatsBooked: {
                type: [Number],
                required: true,
            },
            journeyDateo: {
                to: {
                    type: String,
                    required: true
                },
                from: {
                    type: String,
                    required: true
                }
            },

        }
    ]
});
const Car = model<ICar & mongoose.Document>('Cars', CarSchema);
export default Car;