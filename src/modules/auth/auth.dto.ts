import { IsNotEmpty, MinLength } from "class-validator";

export default class LoginDto {
    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    @IsNotEmpty()
    public username: string;
    @IsNotEmpty()
    public password: string;
}
