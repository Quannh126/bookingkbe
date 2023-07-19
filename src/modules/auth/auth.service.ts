import { User, IUser } from "@modules/users";
import { DataStoredInToken, IProfile, TokenData } from "@modules/auth";
import { isEmptyObject } from "@core/utils/helper";
import { HttpException } from "@core/exceptions";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import LoginDto from "./auth.dto";
import { AccessTokenData, DataStoredInTokenRefresh } from "./auth.interface";

class AuthService {
    public userModel = User;

    public async login(model: LoginDto): Promise<TokenData> {
        if (isEmptyObject(model)) {
            throw new HttpException(400, "Không có dữ liệu");
        }
        const user = await this.userModel.findOne({ username: model.username });
        if (!user) {
            throw new HttpException(
                409,
                `Tên đăng nhập hoặc mật khẩu không đúng`
            );
        }
        // console.log(model.password + "---" + user.password);
        const isMatchPassword = await bcryptjs.compare(
            model.password,
            user.password
        );
        if (!isMatchPassword) {
            throw new HttpException(
                409,
                `Tên đăng nhập hoặc mật khẩu không đúng`
            );
        }
        return this.createAllToken(user);
    }
    // GET /auth
    public async getCurrentUser(uid: string): Promise<IProfile> {
        const user = await this.userModel.findById({ _id: uid });
        if (!user) {
            throw new HttpException(403, "Người dùng không tồn tại");
        }
        return {
            phone: user.phone,
            fullname: user.fullname,
            role: user.role,
            avatar: user.avatar,
            username: user.username,
        };
    }
    // GET /refresh
    public async refreshToken(userId: string): Promise<AccessTokenData> {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new HttpException(409, `Người dùng không tồn tại`);
        }
        return this.createToken(user);
    }
    private createAllToken(user: IUser): TokenData {
        const dataToken: DataStoredInToken = { id: user._id, role: user.role };
        const data: DataStoredInTokenRefresh = { id: user._id };
        const secret: string = process.env.JWT_KEY!;
        const secret2: string = process.env.REFRESH_KEY!;
        const expiresIn1: number = 60 * 60 * 1000;
        const expiresIn2: number = 24 * 60 * 60 * 1000;
        const now = new Date().getTime();
        const expiredAt: number = expiresIn1 + now;

        return {
            accessToken: jwt.sign(dataToken, secret, {
                expiresIn: expiresIn1,
            })!,
            refreshToken: jwt.sign(data, secret2, { expiresIn: expiresIn2 })!,
            expiredAt: expiredAt,
        };
    }
    private createToken(user: IUser): AccessTokenData {
        const dataToken: DataStoredInToken = { id: user._id, role: user.role };

        const secret: string = process.env.JWT_KEY!;
        const expiresIn1: number = 10 * 1000;
        const now = new Date().getTime();
        const expiredAt: number = expiresIn1 + now;

        return {
            accessToken: jwt.sign(dataToken, secret, {
                expiresIn: expiresIn1,
            })!,
            expiredAt: expiredAt,
        };
    }
}
export default AuthService;
