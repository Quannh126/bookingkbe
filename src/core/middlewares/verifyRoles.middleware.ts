import { Request, NextFunction, Response } from "express";

const verifyRolesMiddleware = (roles: string[]) => {
    // console.log(roles);
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.user.role;

        if (!roles.includes(userRole)) {
            return res.status(403).json({ message: "Forbidden" });
        }

        next();
    };
};
export default verifyRolesMiddleware;
