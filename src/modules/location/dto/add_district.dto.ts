import { IsNotEmpty } from "class-validator";

export default class AddDistrictDTO {
    @IsNotEmpty()
    public district_name: string | undefined;
    @IsNotEmpty()
    public district_type: string | undefined;
}
