import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/TokenUtil";
import { IUser } from '../models/UserModel';
import { ValidationError } from "./Error";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;
    console.log("Hi", auth);
    if (auth?.startsWith("Bearer")) {
        const token = auth.split(" ")?.[1];
        const user: unknown = verifyToken(token);
        if (user) {
            req.user = user;
        }
        next();
    } else {
        res.status(401).send(new ValidationError([{message: "Token didnt match"}]));
    }
}