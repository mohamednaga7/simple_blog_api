import express, {NextFunction, Request, Response} from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();
import { BaseException } from "./Exceptions/BaseException";
import {dbConnect} from "./config/db";
import {authRouter} from "./routes/authRoutes";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRouter);


app.use((err: BaseException, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    res.status(err.statusCode).json({
        message: err.message,
        key: err.key
    })
})

const PORT = process.env.PORT || 5001;

dbConnect().then((connection) => {
    if (connection) {
        app.listen(PORT, () => {console.log(`Server is listening on port ${PORT}`)})
    }})
