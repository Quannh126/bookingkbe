export default class RegisterDto {
    constructor(name: string, email: string, phone: number, password: string){
        this.email = email;
        this.name = name;
        this.phone = phone;
        this.password = password;

    }
    public name: string ;
    public email: string;
    public phone: Number;
    public password: string;
}