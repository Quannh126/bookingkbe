import { IsNotEmpty } from "class-validator";

export default class AddCustomerDTO {
    public _id?: string | undefined;
    @IsNotEmpty()
    public name: string | undefined;
    @IsNotEmpty()
    public email: string | undefined;
    @IsNotEmpty()
    public address: string | undefined;
    @IsNotEmpty()
    public phonenumber: string | undefined;
}
