import {Request, Response} from "express"
import {nlpService} from "./nlp.service";


export const processedArticle = async (req: Request, res: Response) => {
    try{
        const count = await nlpService.processedArticle();
        res.status(200).json({
            success: true,
            processed: count
        })
    } catch (error) {
        res.status(500).json({
            success: false
        });

    }

};