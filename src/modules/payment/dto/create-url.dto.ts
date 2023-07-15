import { IsNotEmpty } from "class-validator";

export default class CreatePaymentDTO {
    @IsNotEmpty()
    public amount: string | undefined;

    @IsNotEmpty()
    public bankCode: string | undefined;

    @IsNotEmpty()
    public orderInfo: string | undefined;

    @IsNotEmpty()
    public orderType: string | undefined;

    public locale: string | undefined;
}
