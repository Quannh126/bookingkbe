import { IsNotEmpty } from "class-validator";

export default class AddDistrictDTO {
    @IsNotEmpty()
    public province_id: number | undefined;
    @IsNotEmpty()
    public district_name: string | undefined;
    @IsNotEmpty()
    public district_type: string | undefined;
}
