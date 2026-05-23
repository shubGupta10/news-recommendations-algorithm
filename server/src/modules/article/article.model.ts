import mongoose from "mongoose";
import {IArticle} from "./article.interface";

export const ArticleSchema = new mongoose.Schema<IArticle>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    link: {
        type: String,
        required: true,
        unique: true,
    },
    source: {
        type: String,
        required: true,
    },
    publishedAt: {
        type: Date,
        default: Date.now,
    },
    keywords: {
        type: [String],
        default: [],
    },
    topic: {
        type: String,
        default: "General",
    },
    isProcessed: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

const Article = mongoose.model<IArticle>("Article", ArticleSchema);

export default Article;
