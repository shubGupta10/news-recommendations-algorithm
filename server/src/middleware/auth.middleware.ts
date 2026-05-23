import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const extractToken = (req: Request) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return null;

    const [scheme, token] = authHeader.split(" ");
    if (scheme !== "Bearer" || !token) return null;

    return token;
};

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = extractToken(req);

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email?: string };
        res.locals.userId = decoded.userId;
        res.locals.userEmail = decoded.email;
        return next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = extractToken(req);

    if (!token) {
        return next();
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email?: string };
        res.locals.userId = decoded.userId;
        res.locals.userEmail = decoded.email;
        return next();
    } catch (error) {
        return next();
    }
};

