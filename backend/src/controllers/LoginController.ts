import express, { NextFunction, Request, Response } from 'express';
import { IUser, UserModel } from '../models/UserModel';
import { comparePassword, createHash } from '../utils/EncryptUtil';
import { NotFoundError, ValidationError } from '../middleware/Error';
import { generateToken } from '../utils/TokenUtil';
const router = express.Router();

router.post("/register", async (req: Request, res: Response, next: NextFunction) => {
    const {emailId, password, userProfile} = req.body;
    
    try {
        const hashPwd = createHash(password);
        const loginUser: IUser = await UserModel.create({
            emailId, password: hashPwd, userProfile
        });
        console.log({loginUser});
        res.status(200).json({message: "SUCCESS"});
    }
    catch(error: any) {
        console.log("Error");
    }
});

router.post("/sign-in", async(req: Request, res: Response, next: NextFunction) => {
    const {emailId, password} = req.body;
    const loginUser: IUser | null = await UserModel.findOne({emailId});
    if (!loginUser) {
        console.log("Came In");
        res.status(404).send(new NotFoundError("User does not exist"));
    }
    console.log({loginUser});
    const matched = comparePassword(password, loginUser?.password!);
    if (!matched) {
        next(new ValidationError([{message: "Password doesnt match"}]))
    } else {
        res.setHeader("token", generateToken(loginUser!)).json({loginUser});
    }
});

export default router;