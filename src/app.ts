import dotenv from "dotenv";
import express, {
    type Application,
    type Request,
    type Response,
} from "express";
const app: Application = express();

import cookieParser from "cookie-parser";
import cors from "cors";
import { issueRoute } from "./modules/issues/issue.route";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import { authRoute } from "./modules/auth/auth.route";

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
app.use("/api/auth", authRoute);

// issue-routes
app.use("/api/issues", issueRoute);

// Global Error Handling Middleware
app.use(globalErrorHandler);

export default app;
