import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import { connectDB } from "./config/db";
import agenda from "./config/agenda";
import { fetchArticles } from "./modules/ingestion/ingestion.service";

//routes
import ingestionRouter from "./routes/ingestion/ingestion.router";
import articleRouter from "./routes/article/article.router";
import nlpRouter from "./routes/nlp/nlp.router";
import recommendationRouter from "./routes/recommendation/recommendation.router";
import feedbackRouter from "./routes/feedback/feedback.router";
import authRouter from "./routes/auth/auth.router";
import { errorMiddleware } from "./middleware/error.middleware";
import {nlpService} from "./modules/nlp/nlp.service";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

agenda.define("Fetch News RSS", async () => {
    try {
        console.log("Fetching news...");

        await fetchArticles();
        await nlpService.processedArticle();

        console.log("News fetched and processed");
    } catch (error) {
        console.error(
            "Scheduled task failed:",
            error
        );
    }
});

// Routes
app.use("/api/ingestion", ingestionRouter);
app.use("/api/article", articleRouter);
app.use("/api/nlp", nlpRouter);
app.use("/api/recommendation", recommendationRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/auth", authRouter);

// Must stay LAST
app.use(errorMiddleware);

const startServer = async () => {
    try {

        await connectDB();

        console.log(
            "Database connected successfully"
        );

        // Initial fetch + process
        await fetchArticles();
        await nlpService.processedArticle();

        await agenda.start();

        await agenda.every(
            "1 hour",
            "Fetch News RSS"
        );

        app.listen(PORT, () => {
            console.log(
                `Server started on port: ${PORT}`
            );
        });

    } catch (error) {

        console.error(
            "Failed to start server:",
            error
        );

        process.exit(1);

    }
};

startServer();