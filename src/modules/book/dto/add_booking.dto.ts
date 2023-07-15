import { ICustomer } from "@modules/customer";
import { IsNotEmpty } from "class-validator";

export default class AddBookingDto {
    list_id?: string | undefined;
    @IsNotEmpty()
    public customer: ICustomer | undefined;
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
    public is_payment_online: string | undefined;

    public status_payment: string | undefined;
    @IsNotEmpty()
    public note: string | undefined;
}
