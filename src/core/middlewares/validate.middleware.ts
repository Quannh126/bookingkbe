import { NextFunction, RequestHandler, Request, Response} from "express";
import {plainToInstance} from 'class-transformer';
import {validate, ValidationError} from 'class-validator';
import { Logger } from "@core/utils";
import { HttpException } from "@core/exceptions";
const validateMiddleware = (type: any, skipMissingProperties = false ): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) =>{
        validate(
            plainToInstance(type, req.body), 
            {skipMissingProperties})
                .then((errors: ValidationError[])=> {
                    if(errors.length > 0){
                        const message = errors.map((error: ValidationError) =>{
                            return Object.values(error.constraints!);
                        }).join(", ");
                        next(new HttpException(400, message));
                    }
                    next();
                }
        )
    }
};
export default validateMiddleware;