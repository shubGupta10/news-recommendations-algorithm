import Article from "./article.model";

const getAllArticles = async () => {
    try{
        const articles = await Article.find({});
        return articles;
    }catch (error: any){
        console.error("Error fetching articles from getAllArticles", error.message);
    }
}

const getSingleArticle = async (id: string) => {
    try{
        const article = await Article.findById({
            _id: id,
        })
        return article;
    }catch (error: any){
        console.error("Error fetching article from getSingleArticle", error.message);
    }
}

export const articleService = {
    getAllArticles,
    getSingleArticle
}