import {Request, Response, NextFunction} from "express";
import dotenv from "dotenv";
dotenv.config();

export const errorMiddleware = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(error);

    const statusCode = error.statusCode || 500;

    const message = error.message || "Internal Server Error";

    return res.status(
        statusCode
    ).json({
        success: false,
        message,
        stack:
            process.env.NODE_ENV === "development"
                ? error.stack
                : undefined
    });

};