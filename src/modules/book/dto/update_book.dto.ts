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
    public ticket_code: string | undefined;
    @IsNotEmpty()
    public selectedSeats: string | undefined;
    @IsNotEmpty()
    public status: string | undefined;
    @IsNotEmpty()
    public trip_id: string | undefined;
    list_id?: string | undefined;
    @IsNotEmpty()
    public selected_seats: string | undefined;
    @IsNotEmpty()
    public journey_date: string | undefined;
    @IsNotEmpty()
    public pickup_point: string | undefined;
    @IsNotEmpty()
    public dropoff_point: string | undefined;
    @IsNotEmpty()
    public is_payment_online: string | undefined;
    public status_payment: string | undefined;
    @IsNotEmpty()
    public note: string | undefined;
}
