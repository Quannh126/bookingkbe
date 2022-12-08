import {User,IUser} from '@modules/users';
import { DataStoredInToken, TokenData } from '@modules/auth'
import { isEmptyObject } from '@core/utils/helper';
import { HttpException } from '@core/exceptions';
import gravatar from 'gravatar';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import LoginDto from './auth.dto';
class AuthService {
    public userModel = User;

    public async login(model: LoginDto): Promise<TokenData>{
        if(isEmptyObject(model)){
            throw new  HttpException(400, 'Model is empty');
        }     
        const user = await this.userModel.findOne({email: model.email});
        if(!user){
            throw new  HttpException(409, `Email not exist`);
        }
        
        const isMatchPassword = await bcryptjs.compare(model.password, user.password ) 
        if(!isMatchPassword){
            throw new  HttpException(409, `Credential is not valid`);
        }
        return this.createToken(user);

    }

    public async getCurrentUser(uid: string): Promise<IUser>{
        const user = await this.userModel.findById(uid);
        if(!user){
            throw new HttpException(404, "User is not exists");
        }
        return user;
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
export default AuthService;