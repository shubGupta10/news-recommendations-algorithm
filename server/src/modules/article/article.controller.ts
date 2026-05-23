import {articleService} from "./article.service";
import {Request, Response} from "express";

export const getAllArticles = async (req: Request, res: Response) => {
    try{
        const articles = await articleService.getAllArticles();
        res.status(200).json({
            message: "All Articles fetched",
            articlesStored: articles
        })
    }catch (error){
        console.error("Manual ingestion error:", error);
    }
}

export const getSingleArticle = async (req: Request, res: Response) => {
    try{
        const articleId = res.locals.articleId;
        if(!articleId){
            res.status(404).json({
                message: "No such article with id "
            })
        }

        const article = await articleService.getSingleArticle(articleId);
        res.status(200).json({
            message: "Article found with id ",
            article: article
        })
    }catch (error: any){
        console.error("Manual ingestion error:", error);
    }
}