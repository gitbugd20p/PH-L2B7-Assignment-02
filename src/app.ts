import dotenv from "dotenv";
import express, {
    type Application,
    type Request,
    type Response,
} from "express";
const app: Application = express();

import cookieParser from "cookie-parser";
import cors from "cors";
import { userRoute } from "./modules/user/user.route";

dotenv.config();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:5000",
};

app.use(cors(corsOptions));

app.get("/", (req: Request, res: Response) => {
    res.send("DevPulse Server Running!");
});

// user routes
app.use("/api/auth", userRoute);

export default app;
