import { Document } from "mongoose";
import {Action} from "./feedback.enum";

export interface IFeedbackInterface extends Document{
    userId: string;
    articleId: string;
    action: Action;
    createdAt?: Date;
    updatedAt?: Date;
}