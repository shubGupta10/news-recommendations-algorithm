import { Request, Response } from "express";
import {recommendationService} from "./recommendation.service";

export const recommendArticles = async (req: Request, res: Response) => {
        try {
            const { articleId } = req.query;
            const userId = res.locals.userId as string | undefined;

            const recommendations = await recommendationService.getRecommendations(
                    articleId as string,
                    userId
                );
            return res.status(200).json({
                success: true,
                recommendations
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };