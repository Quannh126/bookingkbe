import { IsNotEmpty } from "class-validator";

export default class AddPointDTO {
    @IsNotEmpty()
    public name: string | undefined;
    @IsNotEmpty()
    public address: string | undefined;
}
