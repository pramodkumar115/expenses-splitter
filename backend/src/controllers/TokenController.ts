import express, { Request, Response } from 'express';
import { generateToken, verifyToken } from '../utils/TokenUtil';
import { ValidationError } from '../middleware/Error';

const router = express.Router();

router.post("/generateToken", (req: Request, res: Response) => {
    const user = req.body;
    res.send(generateToken(user));
});

router.post("/verifyToken", (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (token) {
    res.send(verifyToken(`$Bearer ${token}`));
    } else {
        res.send(new ValidationError([{message: "Token validation failed"}]))
    }
});

export default router;