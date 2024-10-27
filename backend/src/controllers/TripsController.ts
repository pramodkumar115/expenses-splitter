import express, { Request, Response } from 'express';
import { authenticate } from '../middleware/Authenticator';
const router = express.Router();

router.post("/addTrip", authenticate, (req: Request, res: Response) => {
    
})

router.get("/getAllMyTrips", authenticate, (req: Request, res: Response) => {
    res.send("Success");
})

router.get("/getTrip", authenticate, (req: Request, res: Response) => {
    res.send("Success in getTrip");
})
export default router;