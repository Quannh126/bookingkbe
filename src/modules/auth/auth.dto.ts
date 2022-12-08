import {IsNotEmpty, MinLength} from 'class-validator'

export default class LoginDto {
    constructor(name: string, email: string, phone: number, password: string){
        this.email = email;
        this.password = password;
    }
   
    @IsNotEmpty()
    public email: string;
    @IsNotEmpty()
    @MinLength(10, {
        message: 'Title is too short',
    })
    public password: string;
}