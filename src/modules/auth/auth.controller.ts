import { NextFunction, Request, Response } from "express";
import { TokenData, LoginDto } from "@modules/auth";
import AuthService from "./auth.service";
// import { Request } from "aws-sdk";
import { AccessTokenData } from "./auth.interface";
export default class UserController {
    private authService = new AuthService();

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: LoginDto = req.body;
            const tokenData: TokenData = await this.authService.login(model);
            res.cookie("jwt", tokenData.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            res.status(200).json({
                accessToken: tokenData.accessToken,
                expiredAt: tokenData.expiredAt,
            });
        } catch (error) {
            next(error);
        }
    };

    public getCurrentUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const user = await this.authService.getCurrentUser(req.user.id);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };

    public refreshToken = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const tokenData: AccessTokenData =
                await this.authService.refreshToken(req.user.id);
            res.status(200).json(tokenData);
        } catch (error) {
            next(error);
        }
    };

    public logout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cookies = req.cookies;
            if (!cookies?.jwt) res.sendStatus(204);
            res.clearCookie("jwt", {
                httpOnly: true,
                sameSite: "none",
                secure: true,
            });
            res.json({ message: "Cookie cleared" });
        } catch (error) {
            next(error);
        }
    };
}
