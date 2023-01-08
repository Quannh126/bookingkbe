import { User, IUser } from "@modules/users";
import { DataStoredInToken, IProfile, TokenData } from "@modules/auth";
import { isEmptyObject } from "@core/utils/helper";
import { HttpException } from "@core/exceptions";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import LoginDto from "./auth.dto";

class AuthService {
    public userModel = User;

    public async login(model: LoginDto): Promise<TokenData> {
        if (isEmptyObject(model)) {
            throw new HttpException(400, "Model is empty");
        }
        const user = await this.userModel.findOne({ email: model.email });
        if (!user) {
            throw new HttpException(409, `Email not exist`);
        }
        console.log(model.password, +"---" + user.password);
        const isMatchPassword = await bcryptjs.compare(
            model.password,
            user.password
        );
        if (!isMatchPassword) {
            throw new HttpException(409, `Credential is not valid`);
        }
        return this.createToken(user);
    }

    public async getCurrentUser(uid: string): Promise<IProfile> {
        let user = await this.userModel.findById(uid);
        if (!user) {
            throw new HttpException(404, "User is not exists");
        }
        return {
            phone: user.phone,
            name: user.fullname,
            avatar: user.avatar,
            username: user.username,
        };
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
export default AuthService;
