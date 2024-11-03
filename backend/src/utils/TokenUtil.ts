import jwt from "jsonwebtoken";
import { IUser } from "../models/UserModel";
import { JwtPayload } from 'jsonwebtoken';

export const generateToken = (user: IUser) => {
    console.log("In Generate Token", user);
    const key: string = process.env.JWT_KEY ?? "12345";
    return jwt.sign({user: JSON.stringify(user)}, key, { expiresIn: "1h" });
}

export const verifyToken = (token: string) => {
    const key: string = process.env.JWT_KEY ?? "12345";
    const userStr: JwtPayload | string = jwt.verify(token, key);
    if (typeof userStr === 'string') {
        return JSON.parse(userStr);
    } else {
        return userStr;
    }
}