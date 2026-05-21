import type { Request, Response } from "express";
import sendResponse from "../../utility/sendResponse";
import { authServices } from "./auth.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const result = await authServices.createUserIntoDB(req.body);

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "User created successfully!",
            data: result.rows[0],
        });
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error,
        });
    }
};

const loginUser = async (req: Request, res: Response) => {
    try {
        const result = await authServices.loginUserFromDB(req.body);

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Login successful",
            data: result,
        });
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error,
        });
    }
};

export const authController = {
    createUser,
    loginUser,
};
