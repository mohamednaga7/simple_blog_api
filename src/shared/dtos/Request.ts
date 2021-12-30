import {Request} from "express";
import {RequestUserDTO} from "./RequestUserDTO";


export interface BaseRequest<T> extends Request {
    token?: string,
    user?: RequestUserDTO,
    body: T
}
