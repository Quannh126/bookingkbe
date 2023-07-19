import { Location, ILocation } from "@modules/location";
import { isEmptyObject } from "@core/utils/helper";
import { HttpException } from "@core/exceptions";
import { IPagination, NameValue } from "@core/interfaces";
import Permission, { IPermission } from "./permission.model";
import { AddPermissionDTO, UpdatePermissionDTO } from "./dto/permission.dto";

// import ILineDetail from "./interfaces/carDetail.interface";

class PermissionService {
    public permissionModel = Permission;

    public async addPermission(data: AddPermissionDTO): Promise<IPermission> {
        if (isEmptyObject(data)) {
            throw new HttpException(400, "Model is empty");
        }
        const result = await this.permissionModel.create({
            role: data.role,
            permission: data.permissions,
        });

        if (!result) {
            throw new HttpException(400, "Error");
        }
        return result;
    }

    public async removePermission(role: string): Promise<IPermission> {
        if (role) {
            throw new HttpException(400, "Model is empty");
        }
        const result = await this.permissionModel.findOneAndDelete({
            role: role,
        });

        if (!result) {
            throw new HttpException(400, "Error");
        }
        return result;
    }

    public async updatePermission(
        data: UpdatePermissionDTO
    ): Promise<IPermission> {
        if (isEmptyObject(data)) {
            throw new HttpException(400, "Model is empty");
        }
        const result = await this.permissionModel.findOneAndUpdate({
            role: data.role,
            permissions: data.permissions,
        });

        if (!result) {
            throw new HttpException(400, "Error");
        }
        return result;
    }
    public async getPermission(role: string): Promise<IPermission> {
        if (!role) {
            throw new HttpException(400, "Model is empty");
        }
        const result = await this.permissionModel.findOne({
            role: role,
        });

        if (!result) {
            throw new HttpException(400, "Error");
        }
        return result;
    }
    public async getAllPermission(): Promise<Array<IPermission>> {
        const result = await this.permissionModel.find();

        if (!result) {
            throw new HttpException(400, "No Data");
        }
        return result;
    }
}

export default PermissionService;
