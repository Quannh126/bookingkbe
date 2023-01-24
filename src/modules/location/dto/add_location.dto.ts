import { IsNotEmpty } from "class-validator";

export default class AddLocationDTO {
    @IsNotEmpty()
    public name: string | undefined;
    @IsNotEmpty()
    public division_type: string | undefined;
}
