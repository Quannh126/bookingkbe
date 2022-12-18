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
class UserService {
    public userModel = User;

    public async createUser(model: RegisterDto): Promise<TokenData> {
        if (isEmptyObject(model)) {
            throw new HttpException(400, "Model is empty");
        }
        const user = await this.userModel.findOne({ email: model.email });
        if (user) {
            throw new HttpException(409, "User exist");
        }
        const avatar = gravatar.url(model.email!, {
            size: "200",
            rating: "g",
            default: "mm",
        });

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(model.password!, salt);
        const createUser: IUser = await this.userModel.create({
            ...model,
            password: hashedPassword,
            avatar: avatar,
            date: Date.now(),
        });
        return this.createToken(createUser);
    }
    public async getAll(): Promise<IUser[]> {
        const users = await this.userModel.find().exec();

        return users;
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
    private createToken(user: IUser): TokenData {
        const dataToken: DataStoredInToken = { id: user._id };
        const secret: string = process.env.JWT_KEY!;
        const expiresIn: number = 7200;
        const now = new Date().getTime();
        let expiredAt: number = expiresIn + now;
        return {
            accessToken: jwt.sign(dataToken, secret, { expiresIn: expiresIn })!,
            expiredAt: expiredAt,
        };
    }
}
export default UserService;
