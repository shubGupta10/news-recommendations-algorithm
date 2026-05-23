import Article from "../article/article.model";
import Parser from "rss-parser"

const parser = new Parser();

const feeds = [
    "https://feeds.bbci.co.uk/news/rss.xml",
    "https://techcrunch.com/feed/"
]

export const fetchArticles = async () => {
    let totalInserted = 0;

    for (const feedUrl of feeds) {
        try {
            const feed = await parser.parseURL(feedUrl);

            const articles = feed.items.map(article => ({
                title: article.title || "",
                description: article.contentSnippet || "",
                link: article.link || "",
                source: feed.title || "Unknown Source",
                publishedAt: article.pubDate ? new Date(article.pubDate) : new Date(),
                keywords: [],
                topic: "General",
                isProcessed: false
            }));

            const operations = articles.map(article => ({
                updateOne: {
                    filter: { link: article.link },
                    update: { $setOnInsert: article },
                    upsert: true
                }
            }));

            const result = await Article.bulkWrite(operations);

            totalInserted += (result as any).upsertedCount;
        } catch (error: any) {
            console.error(`Error fetching articles from ${feedUrl}:`, error && error.message ? error.message : error);
        }
    }
    return totalInserted;
}

