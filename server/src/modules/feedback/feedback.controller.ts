import {Request, Response} from "express"
import {feedbackService} from "./feedback.service";
import { Action } from "./feedback.enum";

export const createFeedback = async (req: Request, res: Response) => {
    try{
        const userId = res.locals.userId as string;
        const { articleId, action } = req.body;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        if(!articleId || !action){
            return res.status(400).json({
                success: false,
                message: "articleId and action are required"
            });
        }

        if (!Object.values(Action).includes(action)) {
            return res.status(400).json({
                success: false,
                message: "Invalid action"
            });
        }

        const feedback = await feedbackService.createFeedback(userId, articleId, action as Action);
        return res.status(201).json({
            success: true,
            message: "Feedback submitted",
            feedback,
        })
    } catch (error: any){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getFeedbackByUser = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.userId as string;
        const requestedUserId = req.params.userId;

        if(!userId){
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        if(requestedUserId && requestedUserId !== userId){
            return res.status(403).json({
                success: false,
                message: "Forbidden"
            })
        }

        const feedback = await feedbackService.getFeedbackByUser(userId);
        return res.status(200).json({
            success: true,
            feedback,
        })
    } catch (error: any){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}