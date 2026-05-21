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

export const issueServices = {
    createIssueIntoDB,
    getAllIssuesFromDB,
    getSingleIssueFromDB
};
