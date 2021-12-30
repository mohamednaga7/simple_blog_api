import {NextFunction, Request, Response} from "express";
import {BaseRequest} from "../shared/dtos/Request";
import jwt from 'jsonwebtoken';
import {TokenPayloadDTO} from "../auth/dtos/TokenPayloadDTO";

export const isAuthenticated = (req: BaseRequest<any>, res: Response, next: NextFunction) => {
    if (req.header('authorization')) {
        const token = req.header('authorization')?.replace('Bearer ', '');
        if (token) {
            const payload = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayloadDTO ;
            req.token = payload.token;
            req.user = payload.user;
        }
    }
    next();
}