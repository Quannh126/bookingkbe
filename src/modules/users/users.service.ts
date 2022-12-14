import User from './users.model';
import RegisterDto from '@modules/users/dtos/register.dto';
import { DataStoredInToken, TokenData } from '@modules/auth';
import { isEmptyObject } from '@core/utils/helper';
import { HttpException } from '@core/exceptions';
import gravatar from 'gravatar';
import bcryptjs from 'bcryptjs';
import IUser from './users.interface';
import jwt from 'jsonwebtoken';
class UserService {
    public userModel = User;

    public async createUser(model: RegisterDto): Promise<TokenData>{
        if(isEmptyObject(model)){
            throw new  HttpException(400, 'Model is empty');
        }
        const user = await this.userModel.findOne({email: model.email, phone: model.phone});
        const avatar = gravatar.url(model.email!, {
            size: '200',
            rating: 'g',
            default: 'mm'
        });

        const  salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(model.password!, salt);
        const createUser: IUser = await this.userModel.create({
            ...model,
            password: hashedPassword,
            avatar: avatar,
            date: Date.now(),
        });
        return this.createToken(createUser);
    }

    private createToken (user: IUser): TokenData{
        const dataToken: DataStoredInToken = {id: user._id};
        const secret: string = process.env.JWT_KEY!;
        const expiresIn: number = 60;
        return {
            token: jwt.sign(dataToken, secret, {expiresIn: expiresIn })!
        }
    }

}   
export default UserService;