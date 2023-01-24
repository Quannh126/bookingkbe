import { IsNotEmpty } from "class-validator";

export default class AddPointDTO {
    @IsNotEmpty()
    public province_id: number | undefined;
    @IsNotEmpty()
    public district_id: number | undefined;
    @IsNotEmpty()
    public name: string | undefined;
    @IsNotEmpty()
    public address: string | undefined;
}
