import { IsNotEmpty } from "class-validator";

export default class CreateLocationDTO {
    @IsNotEmpty()
    public province_name: string | undefined;
    @IsNotEmpty()
    public province_type: string | undefined;
    @IsNotEmpty()
    public district_name: string | undefined;
    @IsNotEmpty()
    public district_type: string | undefined;
    @IsNotEmpty()
    public name: string | undefined;
    @IsNotEmpty()
    public address: string | undefined;
}
