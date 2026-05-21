import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

// signup user
router.post("/signup", authController.createUser);

// login user
router.post("/login", authController.loginUser);

export const authRoute = router;
