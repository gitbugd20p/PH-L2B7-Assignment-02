import { StatusCodes } from "http-status-codes";
import { pool } from "../../db";
import AppError from "../../errors/AppError";
import type { IIssue } from "./issue.interface";

const createIssueIntoDB = async (reporter_id: number, payload: IIssue) => {
    const { title, description, type } = payload;

    const result = await pool.query(
        `
        INSERT INTO issues
        (title, description, type, reporter_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        [title, description, type, reporter_id],
    );

    return result;
};

const getAllIssuesFromDB = async () => {
    const result = await pool.query(
        `
        SELECT * FROM issues
        ORDER BY created_at DESC
        `,
    );

    if (result.rows.length === 0) {
        throw new AppError(StatusCodes.NOT_FOUND, "Issue not found");
    }

    const finalResult = await Promise.all(
        result.rows.map(async (issue) => {
            const reporter_id = issue.reporter_id;

            const reporterResult = await pool.query(
                `
            SELECT id, name, role FROM users
            WHERE id = $1
            `,
                [reporter_id],
            );

            const reporter = reporterResult.rows[0];

            return {
                id: issue.id,
                title: issue.title,
                description: issue.description,
                type: issue.type,
                status: issue.status,
                reporter: reporter,
                created_at: issue.created_at,
                updated_at: issue.updated_at,
            };
        }),
    );

    return finalResult;
};

const getSingleIssueFromDB = async (id: number) => {
    const result = await pool.query(
        `
        SELECT * FROM issues
        WHERE id = $1
        `,
        [id],
    );

    if (result.rows.length === 0) {
        throw new AppError(StatusCodes.NOT_FOUND, "Issue not found");
    }

    const reporter_id = result.rows[0].reporter_id;

    const reporterDetails = await pool.query(
        `
        SELECT id, name, role FROM users
        WHERE id = $1
        `,
        [reporter_id],
    );

    const reporter = reporterDetails.rows[0];

    result.rows[0].reporter = reporter;

    delete result.rows[0].reporter_id;

    return {
        id: result.rows[0].id,
        title: result.rows[0].title,
        description: result.rows[0].description,
        type: result.rows[0].type,
        status: result.rows[0].status,
        reporter: result.rows[0].reporter,
        created_at: result.rows[0].created_at,
        updated_at: result.rows[0].updated_at,
    };
};

const updateIssueIntoDB = async (
    id: number,
    payload: Partial<IIssue>,
    user: any,
) => {
    const existingIssueResult = await pool.query(
        `
        SELECT * FROM issues
        WHERE id = $1        
        `,
        [id],
    );

    if (existingIssueResult.rows.length === 0) {
        throw new AppError(StatusCodes.NOT_FOUND, "Issue not found");
    }

    const existingIssue = existingIssueResult.rows[0];

    // Maintainer update
    if (user.role === "maintainer") {
        const result = await pool.query(
            `
        UPDATE issues
        SET title = COALESCE($1, title),
            description = COALESCE($2, description),
            type = COALESCE($3, type),
            status = COALESCE($4, status),
            updated_at = NOW()
        WHERE id = $5
        RETURNING *
        `,
            [
                payload.title,
                payload.description,
                payload.type,
                payload.status,
                id,
            ],
        );

        return result;
    }

    // contributor update
    if (existingIssue.reporter_id !== user.id) {
        throw new AppError(
            StatusCodes.FORBIDDEN,
            "You can only update your own issue",
        );
    }

    if (existingIssue.status !== "open") {
        throw new AppError(
            StatusCodes.CONFLICT,
            "You cannot update a non-open issue",
        );
    }

    const result = await pool.query(
        `
        UPDATE issues
        SET
            title = COALESCE($1, title),
            description = COALESCE($2, description),
            type = COALESCE($3, type),
            updated_at = NOW()
        WHERE id = $4
        RETURNING *
        `,
        [payload.title, payload.description, payload.type, id],
    );

    return result;
};

const deleteIssueFromDB = async (id: number) => {
    const result = await pool.query(
        `
        DELETE FROM issues
        WHERE id = $1
        RETURNING *
        `,
        [id],
    );

    if (result.rows.length === 0) {
        throw new AppError(StatusCodes.NOT_FOUND, "Issue not found");
    }

    return result;
};

export const issueServices = {
    createIssueIntoDB,
    getAllIssuesFromDB,
    getSingleIssueFromDB,
    updateIssueIntoDB,
    deleteIssueFromDB,
};
