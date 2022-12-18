import mongoose, { Schema, model } from "mongoose";
import ICar from "./interfaces/cars.inteface";
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
  trips: [
    {
      arrival: {
        type: String,
      },
      departure: {
        type: String,
      },
      to: {
        type: String,
      },
      from: {
        type: String,
      },
      phoneDriver: {
        type: String,
      },
      driverName: {
        type: String,
      },
      imagePath: {
        type: String,
      },
      fare: {
        type: String,
      },
      seatsBooked: {
        type: [Number],
      },
      journeyDateo: {
        to: {
          type: String,
        },
        from: {
          type: String,
        },
      },
    },
  ],
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
