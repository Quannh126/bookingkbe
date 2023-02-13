import { IsNotEmpty } from "class-validator";

export default class AddCarDto {
    public _id?: string | undefined;
    @IsNotEmpty()
    public name: string | undefined;
    @IsNotEmpty()
    public type_car: string | undefined;
    @IsNotEmpty()

    // attachment: Array<File>;
    public license_plate: string | undefined;
    @IsNotEmpty()
    public capacity: string | undefined;

    public description: string | undefined;
    @IsNotEmpty()
    public driver_name: string | undefined;
    @IsNotEmpty()
    public phonenumber: string | undefined;
}
