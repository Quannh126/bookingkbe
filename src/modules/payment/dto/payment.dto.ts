import { IsNotEmpty } from "class-validator";

export default class PaymentDataDTO {
    @IsNotEmpty()
    public trip_id: string | undefined;

    @IsNotEmpty()
    public list_ticket: [string] | undefined;

    @IsNotEmpty()
    public customer_id: string | undefined;
}
