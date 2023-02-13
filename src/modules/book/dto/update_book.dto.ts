import { IsNotEmpty } from "class-validator";
type Customer = {
    email: string;
    name: string;
    phonenumber: string;
    times_booking: string;
    _id: string;
};
export default class UpdateBookingDto {
    @IsNotEmpty()
    public _id?: string | undefined;
    @IsNotEmpty()
    public customer: Customer | undefined;
    @IsNotEmpty()
    public fare: string | undefined;
    @IsNotEmpty()
    public selectedSeats: string | undefined;
    @IsNotEmpty()
    public status: string | undefined;
    @IsNotEmpty()
    public trip_id: string | undefined;
}
