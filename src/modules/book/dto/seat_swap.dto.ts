import { ICustomer } from "@modules/customer";
import { IsNotEmpty } from "class-validator";

export default class SwapSeatDTO {
    @IsNotEmpty()
    public seat: Number | undefined;
    @IsNotEmpty()
    public booking_id: string | undefined;
}
