import { Request, Response } from "express";
import { fetchArticles} from "./ingestion.service";

export const ingestNews = async (req: Request, res: Response) => {
    try {
        const count = await fetchArticles();

        res.status(200).json({
            success: true,
            articlesStored: count
        });
    } catch (error) {
        console.error("Manual ingestion error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch articles"
        });
    }
}

