import {Action} from "./feedback.enum";
import {IFeedbackInterface} from "./feedback.interface";
import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema<IFeedbackInterface>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true,
    },
    articleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article",
        required: true,
    },
    action: {
        type: String,
        enum: Object.values(Action),
        required: true,
    },
}, {timestamps: true});

const Feedback = mongoose.model<IFeedbackInterface>("Feedback", FeedbackSchema);

export default Feedback;