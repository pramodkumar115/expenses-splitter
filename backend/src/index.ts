import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import { errorHandler } from "./middleware/ErrorHandler";
import LoginController from "./controllers/LoginController";
import TokenController from "./controllers/TokenController";
import TripsController from "./controllers/TripsController";
import { authenticate } from "./middleware/Authenticator";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(errorHandler)
connectDB();
app.use("/login", LoginController);
app.use("/token", TokenController);
app.use("/trips", TripsController);


app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript");
})

app.listen(port, () => {
    console.log("App is running 123");
})

process.on("unhandledRejection", (error, promise) => {
    console.log("error", error);
    process.exit(1);
})