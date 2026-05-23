import express from "express";
import {getAllArticles, getSingleArticle} from "../../modules/article/article.controller";

const router = express.Router();

router.get("/", getAllArticles);
router.get("/:id", getSingleArticle);

export default router;