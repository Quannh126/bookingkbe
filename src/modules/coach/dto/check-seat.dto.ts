import { ICustomer } from "@modules/customer";
import { IsNotEmpty } from "class-validator";

export default class CheckSeatDTO {
    @IsNotEmpty()
    public seat: Number | undefined;
    @IsNotEmpty()
    public trip_id: string | undefined;
    @IsNotEmpty()
    public journey_date: string | undefined;
}
