import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

// signup user
router.post("/signup", userController.getAllUser);

export const userRoute = router;
