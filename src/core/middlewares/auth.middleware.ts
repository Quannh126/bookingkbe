import { DataStoredInToken } from "@modules/auth";
import { Request, NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let token = req.header("Authorization") || req.header("x-access-token");

    if (!token) {
        return res
            .status(401)
            .json({ message: "No token, authorization denied" });
    }
    token = token.replace(/^Bearer\s+/, "");
    try {
        const user = jwt.verify(
            token,
            process.env.JWT_KEY!
        ) as DataStoredInToken;
        if (!req.user) req.user = { id: "" };
        req.user.id = user.id;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token is not valid" });
    }
};
export default authMiddleware;
