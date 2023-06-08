import { IsNotEmpty, minLength, MinLength } from "class-validator";

export default class RegisterDto {
    @IsNotEmpty()
    public fullname: string | undefined;
    @IsNotEmpty()
    public username: string | undefined;
    @IsNotEmpty()
    public phone: Number | undefined;
    @IsNotEmpty()
    public email: string | undefined;
    @IsNotEmpty()
    @MinLength(6, {
        message: "Too short",
    })
    public password: string | undefined;
}