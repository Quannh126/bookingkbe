import { IsNotEmpty } from "class-validator";

export default class CreateLineDTO {
    @IsNotEmpty()
    public arrival: string | undefined;

    public _id: string | undefined;
    @IsNotEmpty()
    public departure: string | undefined;
    @IsNotEmpty()
    public to: string | undefined;
    @IsNotEmpty()
    public from: string | undefined;
}
