import express from "express";
import {processedArticle} from "../../modules/nlp/nlp.controller";

const router = express.Router();

router.post(
    "/",
    processedArticle
);

export default router;