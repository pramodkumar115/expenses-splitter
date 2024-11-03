import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/TokenUtil";
import { IUser } from '../models/UserModel';
import { ValidationError } from "./Error";
import { JwtPayload } from "jsonwebtoken";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;
    console.log("Hi", auth);
    if (auth?.startsWith("Bearer")) {
        const token = auth.split(" ")?.[1];
        const tokenUser = verifyToken(token);
        if (tokenUser) {
            req.user = tokenUser?.user;
        } else {
            res.status(403).send(new ValidationError([{message: "Token didnt match"}]));
        }
        next();
    } else {
        res.status(403).send(new ValidationError([{message: "Token didnt match"}]));
    }
}