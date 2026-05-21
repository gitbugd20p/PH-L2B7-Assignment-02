import type { Request, Response } from "express";
import sendResponse from "../../utility/sendResponse";
import { issueServices } from "./issue.service";

const createIssue = async (req: Request, res: Response) => {
    try {
        const result = await issueServices.createIssueIntoDB(req.body);

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Issue created successfully",
            data: result.rows[0],
        });
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error,
        });
    }
};

const getAllIssues = async (req: Request, res: Response) => {
    try {
        const result = await issueServices.getAllIssuesFromDB();

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "All Issues retrieved successfully!",
            data: result.rows,
        });
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error,
        });
    }
};

export const issueController = {
    createIssue,
    getAllIssues,
};
