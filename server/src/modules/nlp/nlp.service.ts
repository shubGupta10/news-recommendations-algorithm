import keyword_extractor from "keyword-extractor";
import {removeStopwords} from "stopword"
import ArticleModel from "../article/article.model";
import Article from "../article/article.model";
import {classifyTopic} from "./nlp.utils";


const processedArticle = async () => {
    const articles = await Article.find({
        isProcessed: false
    })

    for(const article of articles){
        const text = `${article.title} ${article.description}`

        const keywords = keyword_extractor.extract(text, {
            language: "en",
            remove_digits: true,
            return_changed_case: true,
            remove_duplicates: true
        })
        const cleanWords = removeStopwords(keywords);

        article.keywords = cleanWords;
        article.topic = classifyTopic(text);
        article.isProcessed = true;

        await article.save();
    }
    return articles.length;
}

export const nlpService = {
    processedArticle
}

