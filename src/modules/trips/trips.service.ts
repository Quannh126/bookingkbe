import { HttpException } from "@core/exceptions";
import { Car, ICar } from "@modules/cars";
import CreateTripDTO from "./dto/create_trips.dto";
import ITrip from "./interfaces/trip.interface";

export default class TripService {
    public carModel = Car;
    public async getAllTrip(): Promise<ICar[]> {
        const cars = await this.carModel.find({}).exec();
        if (!cars) {
            return [];
        }
        return cars;
    }
    // public async getListTrip(carid: string): Promise<ITrip[]> {
    //     const car = await this.carModel.findById(carid);
    //     if (!car) {
    //         return [];
    //     }
    //     return car.trips;
    // }
    // public async addTrip(carid: string, data: CreateTripDTO): Promise<ITrip[]> {
    //     const car = await this.carModel.findById(carid).exec();
    //     if (!car) {
    //         throw new HttpException(400, "Car not found");
    //     }

    //     const newTrip = {
    //         arrival: data.arrival,
    //         departure: data.departure,
    //         to: data.to,
    //         from: data.from,
    //         fare: data.fare,
    //     };

    //     car.trips.unshift(newTrip as ITrip);
    //     await car.save();
    //     return car.trips;
    // }

    // public async removeTrip(carid: string, tripid: string): Promise<ITrip[]> {
    //     const car = await this.carModel.findById(carid).exec();
    //     if (!car) {
    //         throw new HttpException(400, "Car not found");
    //     }
    //     const trip = car.trips.find((c: ITrip) => c._id === tripid);
    //     if (!trip) {
    //         throw new HttpException(400, "Trip not found");
    //     }
    //     car.trips = car.trips.filter(({ _id }) => _id !== tripid);
    //     await car.save();
    //     return car.trips;
    // }

    // public async updateTrip(
    //     carid: string,

    //     data: ITrip
    // ): Promise<ITrip[]> {
    //     const car = await this.carModel.findById(carid).exec();
    //     if (!car) {
    //         throw new HttpException(400, "Car not found");
    //     }
    //     const trip = car.trips.find((c: ITrip) => c._id === data._id);
    //     if (!trip) {
    //         throw new HttpException(400, "Trip not found");
    //     }

    //     const updateTrip = { ...trip, ...data };
    //     car.trips = car.trips.filter(({ _id }) => _id !== data._id);
    //     car.trips.unshift(updateTrip as ITrip);
    //     await car.save();
    //     return car.trips;
    // }
}
