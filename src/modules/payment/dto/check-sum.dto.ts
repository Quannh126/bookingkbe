import { IsNotEmpty } from "class-validator";

export default class CheckSumDTO {
    @IsNotEmpty()
    public vnp_Amount: string | undefined;

    @IsNotEmpty()
    public vnp_BankCode: string | undefined;

    @IsNotEmpty()
    public vnp_BankTranNo: string | undefined;

    @IsNotEmpty()
    public vnp_CardType: string | undefined;

    @IsNotEmpty()
    public vnp_OrderInfo: string | undefined;

    @IsNotEmpty()
    public vnp_PayDate: string | undefined;

    @IsNotEmpty()
    public vnp_ResponseCode: string | undefined;

    @IsNotEmpty()
    public vnp_TmnCode: string | undefined;

    @IsNotEmpty()
    public vnp_TransactionNo: string | undefined;

    @IsNotEmpty()
    public vnp_TransactionStatus: string | undefined;

    @IsNotEmpty()
    public vnp_TxnRef: string | undefined;

    @IsNotEmpty()
    public vnp_SecureHash: string | undefined;
}
