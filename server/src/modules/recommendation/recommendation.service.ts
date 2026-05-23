import natural from "natural";
import cosineSimilarity from "compute-cosine-similarity";
import Article from "../article/article.model";
import Feedback from "../feedback/feedback.model";

const TfIdf = natural.TfIdf;

const getRecommendations = async (articleId: string, userId?: string) => {
    const currentArticle = await Article.findById(articleId);
    if (!currentArticle) {
        throw new Error("Article not found");
    }

    const excludedArticleIds: Array<string> = [];

    if (userId) {
        const feedbacks = await Feedback.find({
            userId
        }).select("articleId");

        feedbacks.forEach((feedback) => {
            if (feedback.articleId) {
                excludedArticleIds.push(String(feedback.articleId));
            }
        });
    }

    const articleQuery: Record<string, any> = {
        isProcessed: true,
        _id: { $ne: articleId }
    };

    if (excludedArticleIds.length > 0) {
        articleQuery._id = {
            $ne: articleId,
            $nin: excludedArticleIds
        };
    }

    const articles = await Article.find(articleQuery);
    const documents = [currentArticle, ...articles];
    const tfidf = new TfIdf();
    documents.forEach(article => {
        tfidf.addDocument(
            article.keywords.join(" ")
        );
    });
    const vocabulary = new Set<string>();
    documents.forEach((_, index) => {
        tfidf.listTerms(index)
            .forEach(term => {
                vocabulary.add(term.term);
            });
    });
    const terms = [...vocabulary];
    const buildVector = (
        docIndex: number
    ) => {
            return terms.map(term => {
                    const val = (tfidf as any).tfidf(term, docIndex) || 0;
                    return typeof val === 'number' ? val : 0;
                });
    };
    const currentVector =
        buildVector(0);
    const recommendations =
        articles.map(
            (article, index) => {
                const articleVector =
                    buildVector(
                        index + 1
                    );
                let similarity = 0;
                try {
                    similarity = (cosineSimilarity(
                        currentVector,
                        articleVector
                    ) as number) || 0;
                    if (!isFinite(similarity) || Number.isNaN(similarity)) similarity = 0;
                } catch (e) {
                    similarity = 0;
                }
                return {
                    article,
                    similarity
                };
            }
        );

    return recommendations
        .sort(
            (a, b) =>
                b.similarity -
                a.similarity
        )
        .slice(0, 5);

};

export const recommendationService = {
    getRecommendations,
}