import { Request, Response } from "express";
import {authService} from "./ auth.service";

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        const result = await authService.registerUser(name, email, password);

        return res.status(201).json(result);
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error?.message || "Registration failed"
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const result = await authService.loginUser(email, password);

        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error?.message || "Login failed"
        });
    }
};

