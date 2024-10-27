import jwt from "jsonwebtoken";
import { IUser } from "../models/UserModel";

export const generateToken = (user: IUser) => {
    console.log("In Generate Token", user);
    const key: string = process.env.JWT_KEY ?? "12345";
    return jwt.sign(JSON.stringify(user), key);
}

export const verifyToken = (token: string) => {
    const key: string = process.env.JWT_KEY ?? "12345";
    return jwt.verify(token, key)
}