import { IsNotEmpty } from "class-validator";

export default class CreateTripDTO {
    @IsNotEmpty()
    public arrival: string | undefined;
    @IsNotEmpty()
    public departure: string | undefined;
    @IsNotEmpty()
    public to: string | undefined;
    @IsNotEmpty()
    public from: string | undefined;

    public phoneDriver: string | undefined;
    public driverName: string | undefined;
    public seatsBooked: number[] | undefined;
    @IsNotEmpty()
    public fare: String | undefined;
    public imagePath: String | undefined;
}
