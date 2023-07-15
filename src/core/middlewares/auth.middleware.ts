import { DataStoredInToken } from "@modules/auth";
import { Request, NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let token = req.header("authorization") || req.header("x-access-token");
    // console.log()
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
        if (!req.user) req.user = { id: "", role: "" };
        // console.log(req.user);
        req.user.id = user.id;
        req.user.role = user.role;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token is not valid" });
    }
};
export default authMiddleware;
