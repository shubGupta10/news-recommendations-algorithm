import { Document } from "mongoose";

export interface IArticle extends Document {
    title: string;
    description: string;
    link: string;
    source: string;
    publishedAt: Date;
    keywords: string[];
    topic: string;
    isProcessed: boolean;
}