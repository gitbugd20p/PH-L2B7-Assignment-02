import bcrypt from "bcryptjs";
import config from "../../config";
import { pool } from "../../db";
import jwt, { type JwtPayload } from "jsonwebtoken";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";

const createUserIntoDB = async (payload: any) => {
    const { name, email, password, role } = payload;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
        `INSERT INTO users (name, email, password, role)
			VALUES ($1, $2, $3, $4)
			RETURNING *`,
        [name, email, hashedPassword, role],
    );

    delete result.rows[0].password;

    return result;
};

const loginUserFromDB = async (payload: {
    email: string;
    password: string;
}) => {
    const { email, password } = payload;

    // 1. checking if the user exist
    const userData = await pool.query(`SELECT * FROM users WHERE email = $1`, [
        email,
    ]);

    if (userData.rows.length === 0) {
        throw new AppError(StatusCodes.NOT_FOUND, "User not found");
    }

    const user = userData.rows[0];
    // 2. compare the password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "Password is incorrect");
    }

    // 3. generate token
    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    } as JwtPayload;

    const accessToken = jwt.sign(jwtPayload, config.secret as string, {
        expiresIn: "3d",
    });

    delete user.password;

    // 4. return token
    return { token: accessToken, user };
};

export const authServices = {
    createUserIntoDB,
    loginUserFromDB,
};
