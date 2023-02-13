import { IsNotEmpty } from "class-validator";
type Customer = {
    email: string;
    name: string;
    phonenumber: string;
    times_booking: string;
    _id: string;
};
export default class AddBookingDto {
    @IsNotEmpty()
    public customer: Customer | undefined;
    @IsNotEmpty()
    public fare: string | undefined;
    @IsNotEmpty()
    public selected_seats: string | undefined;
    @IsNotEmpty()
    public journey_date: string | undefined;
    @IsNotEmpty()
    public trip_id: string | undefined;
    @IsNotEmpty()
    public pickup_point: string | undefined;
    @IsNotEmpty()
    public dropoff_point: string | undefined;
    @IsNotEmpty()
    public status_payment: string | undefined;
    public note: string | undefined;
}
