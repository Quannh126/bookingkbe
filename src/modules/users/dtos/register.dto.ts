import {IsNotEmpty, minLength, MinLength} from 'class-validator'

export default class RegisterDto {
    constructor(name: string, email: string, phone: number, password: string){
        this.email = email;
        this.name = name;
        this.phone = phone;
        this.password = password;
    }
    @IsNotEmpty()
    public name: string ;
    @IsNotEmpty()
    public email: string;
    @IsNotEmpty()
    public phone: Number;
    @IsNotEmpty()
    @MinLength(6,{
        message: 'Too short'
    })
    public password: string;
}