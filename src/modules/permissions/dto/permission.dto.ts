import { IsNotEmpty } from "class-validator";

export class AddPermissionDTO {
    @IsNotEmpty()
    public role: string | undefined;
    @IsNotEmpty()
    public permissions: [string] | [] | undefined;
}

export class UpdatePermissionDTO {
    @IsNotEmpty()
    public role: string | undefined;
    @IsNotEmpty()
    public permissions: [string] | [] | undefined;
}
