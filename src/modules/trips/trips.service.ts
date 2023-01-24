import { HttpException } from "@core/exceptions";
import { isEmptyObject } from "@core/utils/helper";
import { Car } from "@modules/cars";
import { ITrip, Trip } from "@modules/trips";
import CreateTripDTO from "./dto/create_trips.dto";
// import UpdateTripDTO from "./dto/update_trip.dto";

export default class TripService {
    public tripModel = Trip;
    public carModel = Car;

    public async getAllTrip(): Promise<ITrip[]> {
        const trips = await this.tripModel.find({}).exec();
        if (!trips) {
            return [] as ITrip[];
        }
        return trips;
    }

    public async addTrip(data: CreateTripDTO): Promise<ITrip> {
        if (isEmptyObject(data)) {
            throw new HttpException(400, "Data is empty");
        }
        const carDetail = await this.carModel
            .findOne({ id: data.car_id })
            .exec();
        if (!carDetail) {
        }
        let dataCreate = {
            pickup_point: data.pickup_point,
            dropoff_point: data.dropoff_point,
            car: carDetail,
            departure_time: data.departure_time,
            destination_time: data.destination_time,
            duration: data.duration,
            seats_booked: [],
            fare: data.fare,
            sell_type: data.sell_type,
        };

        const trip = await this.tripModel.create(dataCreate);
        if (!trip) {
            throw new HttpException(400, "Faile Create");
        }
        return trip;
    }

    public async getTripDetaul(trip_id: string): Promise<ITrip> {
        const trip = await this.tripModel.findOne({ _id: trip_id });
        if (!trip) {
            throw new HttpException(400, "Cant find this");
        }
        return trip;
    }

    public async deleteTrip(trip_id: string): Promise<ITrip> {
        const trip = await this.tripModel.findOneAndDelete({ _id: trip_id });
        if (!trip) {
            throw new HttpException(400, "Cant find this");
        }
        return trip;
    }

    public async updateTrip(
        trip_id: string,
        data: CreateTripDTO
    ): Promise<ITrip> {
        const trip = await this.tripModel.findOneAndUpdate(
            { _id: trip_id },
            { ...data }
        );
        if (!trip) {
            throw new HttpException(400, "Cant find this");
        }

        return trip;
    }
}
