import {register} from "./register";
import {Router} from 'express';
import {login} from "./login";

export const authRouter = Router();


authRouter.use(login);
authRouter.use(register);
