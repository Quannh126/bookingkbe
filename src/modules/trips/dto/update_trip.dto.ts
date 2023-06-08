import { ICar } from "@modules/cars";
import { IsNotEmpty } from "class-validator";
import { IPointDetail } from "../interfaces/trip.interface";

export default class UpdateTripDTO {
    @IsNotEmpty()
    public _id: string | undefined;
    @IsNotEmpty()
    public pickup_point!: Array<IPointDetail>;
    @IsNotEmpty()
    public dropoff_point!: Array<IPointDetail>;
    @IsNotEmpty()
    public car_id: string | undefined;
    @IsNotEmpty()
    public departure_time: string | undefined;
    @IsNotEmpty()
    public destination_time: string | undefined;
    @IsNotEmpty()
    public duration: string | undefined;
    @IsNotEmpty()
    public seats_booked: string | undefined;
    @IsNotEmpty()
    public fare: string | undefined;
    @IsNotEmpty()
    public sell_type: string | undefined;
    public car: ICar | undefined;
}
