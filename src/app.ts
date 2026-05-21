import dotenv from "dotenv";
import express, {
    type Application,
    type Request,
    type Response,
} from "express";
const app: Application = express();

import cookieParser from "cookie-parser";
import cors from "cors";

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
    res.send("Hello, Welcome to DevPulse API Endpoints!");
});

export default app;
