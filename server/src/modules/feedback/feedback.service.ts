import Feedback from "./feedback.model";
import { Action } from "./feedback.enum";

const createFeedback = async (userId: string, articleId: string, action: Action) => {
    const feedback = await Feedback.create({
        userId,
        articleId,
        action,
    })

    return feedback;
}

const getFeedbackByUser = async (userId: string) => {
    const feedbacks = await Feedback.find({
        userId
    }).populate("articleId")
    return feedbacks;
}

export const feedbackService = {
    createFeedback,
    getFeedbackByUser,
}