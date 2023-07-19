import User from "./users.model";
import RegisterDto from "@modules/users/dtos/register.dto";
import { DataStoredInToken, TokenData } from "@modules/auth";
import { isEmptyObject } from "@core/utils/helper";
import { HttpException } from "@core/exceptions";
import gravatar from "gravatar";
import bcryptjs from "bcryptjs";
import IUser from "./users.interface";
import jwt from "jsonwebtoken";
import { IPagination } from "@core/interfaces";
import { AccessTokenData } from "@modules/auth/auth.interface";
import UpdateUserDTO from "./dtos/update-user.dto";
import IDataUser from "./dtos/dataUser";
import moment from "moment";
class UserService {
    public userModel = User;

    public async createUser(model: RegisterDto): Promise<AccessTokenData> {
        if (isEmptyObject(model)) {
            throw new HttpException(400, "Model is empty");
        }
        const user = await this.userModel.findOne({ username: model.username });
        if (user) {
            throw new HttpException(409, "User exist");
        }
        const avatar = gravatar.url(model.email!, {
            size: "200",
            rating: "g",
            default: "mm",
        });

        // const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(model.password!, 10);
        const createUser: IUser = await this.userModel.create({
            ...model,
            password: hashedPassword,
            avatar: avatar,
            isVerified: true,
            status: "Active",
            date: Date.now(),
        });
        return this.createToken(createUser);
    }

    public async updateUser(data: UpdateUserDTO): Promise<any> {
        if (isEmptyObject(data)) {
            throw new HttpException(400, "Model is empty");
        }
        const result = await this.userModel.findByIdAndUpdate(data!._id, {
            ...data,
        });

        if (!result) {
            throw new HttpException(400, "Id valid");
        }

        return { message: "success" };
    }
    public async getAll(): Promise<IDataUser[]> {
        const users = await this.userModel.find().exec();
        const transformedData: IDataUser[] = users.map((user: any) => {
            return {
                _id: user._id,
                fullname: user.fullname,
                phone: user.phone,
                username: user.username,
                role: user.role,
                email: user.email || "",
                date: new Date(user.date),
                avatar: user.avatar,
                stringDate: moment(user.date).format("DD/MM/YYYY, hh:mm"),
                status: user.status,
            };
        });
        return transformedData;
    }
    public async getAllPaging(
        keyword: string,
        page: number
    ): Promise<IPagination<IUser>> {
        const pageSize = Number(process.env.PAGE_SIZE);
        let query = {};
        if (keyword) {
            query = { "name": keyword };
        }
        const items = await this.userModel
            .find(query)
            .sort({ date: -1 })
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .exec();

        const count = await this.userModel
            .find(query)
            .estimatedDocumentCount()
            .exec();
        return {
            total: count,
            page: page,
            pageSize: pageSize,
            items: items,
        };
    }

    public async deleteUser(uid: string): Promise<IUser> {
        const deleteUser = await this.userModel.findByIdAndDelete(uid).exec();

        if (!deleteUser) {
            throw new HttpException(409, "ID invalid");
        }
        return deleteUser;
    }
    private createToken(user: IUser): AccessTokenData {
        const dataToken: DataStoredInToken = { id: user._id, role: user.role };
        const secret: string = process.env.JWT_KEY!;
        const expiresIn = 7200;
        const now = new Date().getTime();
        const expiredAt: number = expiresIn + now;
        return {
            accessToken: jwt.sign(dataToken, secret, { expiresIn: expiresIn })!,
            expiredAt: expiredAt,
        };
    }
}
export default UserService;
