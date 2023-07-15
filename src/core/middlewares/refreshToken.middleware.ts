import { DataStoredInTokenRefresh } from "@modules/auth/auth.interface";
import { Request, NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
const refreshTokenMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.status(403).json({ message: "Forbidden" });
    }
    const refreshToken = cookies.jwt;
    try {
        const data = jwt.verify(
            refreshToken,
            process.env.REFRESH_KEY!
        ) as DataStoredInTokenRefresh;

        if (!req.user) req.user = { id: "", role: "" };
        req.user.id = data.id;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Forbidden" });
    }
};
export default refreshTokenMiddleware;
