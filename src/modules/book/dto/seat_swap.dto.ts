import { ICustomer } from "@modules/customer";
import { IsNotEmpty } from "class-validator";

export default class SwapSeatDTO {
    @IsNotEmpty()
    public seat: number | undefined;
    @IsNotEmpty()
    public booking_id: string | undefined;
}
