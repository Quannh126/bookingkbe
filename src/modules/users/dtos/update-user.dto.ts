import { IsNotEmpty, minLength, MinLength } from "class-validator";

export default class UpdateUserDTO {
    @IsNotEmpty()
    public _id: string | undefined;
    @IsNotEmpty()
    public fullname: string | undefined;
    @IsNotEmpty()
    public phone: Number | undefined;
    @IsNotEmpty()
    public email: string | undefined;
    @IsNotEmpty()
    public role: string | undefined;
    public status: string | undefined;
}
