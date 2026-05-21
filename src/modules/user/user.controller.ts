import type { Request, Response } from "express";
import { userServices } from "./user.service";
import sendResponse from "../../utility/sendResponse";

const getAllUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.createUserIntoDB(req.body);

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

export const userController = {
    getAllUser,
};
