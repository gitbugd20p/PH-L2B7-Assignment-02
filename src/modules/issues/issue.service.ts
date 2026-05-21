import { pool } from "../../db";
import type { IIssue } from "./issue.interface";

const createIssueIntoDB = async (payload: IIssue) => {
    const { title, description, type, reporter_id } = payload;

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

    return result;
};

const getSingleIssueFromDB = async (id: number) => {
    const result = await pool.query(
        `
        SELECT * FROM issues
        WHERE id = $1
        `,
        [id],
    );

    return result;
};

const updateIssueIntoDB = async (id: number, payload: Partial<IIssue>) => {
    const result = await pool.query(
        `
        UPDATE issues
        SET
            title = COALESCE($1, title),
            description = COALESCE($2, description),
            type = COALESCE($3, type),
            status = COALESCE($4, status),
            updated_at = NOW()
        WHERE id = $5
        RETURNING *
        `,
        [payload.title, payload.description, payload.type, payload.status, id],
    );

    if (result.rows.length === 0) {
        throw new Error("Issue not found");
    }

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
        throw new Error("Issue not found");
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
