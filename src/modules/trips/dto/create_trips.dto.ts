import { IsNotEmpty } from "class-validator";

export default class CreateTripDTO {
    @IsNotEmpty()
    public from_id: string | undefined;
    @IsNotEmpty()
    public to_id: string | undefined;
    public pickup_point!: Array<IPointDetail>;

    public dropoff_point!: Array<IPointDetail>;
    @IsNotEmpty()
    public car_id: string | undefined;
    @IsNotEmpty()
    public departure_time: string | undefined;
    @IsNotEmpty()
    public destination_time: string | undefined;
    @IsNotEmpty()
    public fare: string | undefined;
    @IsNotEmpty()
    public sell_type: string | undefined;

    public journey_date: Date | undefined;
    @IsNotEmpty()
    public s_journey_date: string | undefined;
}
interface IPointDetail {
    point_id: String;
    district_id: String;
}
