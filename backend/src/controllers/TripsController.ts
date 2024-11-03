import express, { Request, Response } from 'express';
import { authenticate } from '../middleware/Authenticator';
import { ITrip, TripModel } from '../models/TripsModel';
import { BaseError } from '../middleware/Error';
import { IUser } from '../models/UserModel';
const router = express.Router();

router.post("/addTrip", authenticate, async (req: Request, res: Response) => {
    try {
    const trip: ITrip = req.body;
    trip.createdBy = (req.user as IUser);
    trip.createdDate = new Date();
    trip.lastUpdatedBy = (req.user as IUser);
    trip.lastUpdatedDate = new Date();
    const savedTrip = await TripModel.create({
        ...trip
    });
    res.status(200).send(savedTrip);
    } catch(e) {
        console.log(e);
        res.status(500).send(new BaseError("Error creating trip", 500))
    }
});

router.post("/updateTrip", authenticate, async (req: Request, res: Response) => {
    try {
    const trip: ITrip = req.body;
    if (req?.user) {
        trip.lastUpdatedBy = JSON.parse(req.user as string);
    }
    trip.lastUpdatedDate = new Date();
    console.log({id: trip._id})
    const savedTrip = await TripModel.findOneAndUpdate({"_id": trip._id}, trip);
    res.status(200).send(savedTrip);
    } catch(e) {
        console.log(e);
        res.status(500).send(new BaseError("Error creating trip", 500))
    }
})

router.get("/getAllMyTrips", authenticate, async (req: Request, res: Response) => {
    const trips = await TripModel.find({})
    res.send(trips);
})

router.get("/getTrip", authenticate, async (req: Request, res: Response) => {
    const trip = await TripModel.findOne({'_id': req.query['id']});
    console.log(trip);
    res.status(200).json(trip);
})
export default router;