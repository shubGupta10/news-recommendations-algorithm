/**
 * @swagger
 * /api/article:
 *   get:
 *     summary: Get all articles
 *     tags:
 *       - Articles
 *     responses:
 *       200:
 *         description: List of articles
 */

/**
 * @swagger
 * /api/article/{id}:
 *   get:
 *     summary: Get article by ID
 *     tags:
 *       - Articles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 665f8a2f1f4b8c2a9c123456
 *     responses:
 *       200:
 *         description: Returns a single article
 *       404:
 *         description: Article not found
 */

import express from "express";
import {getAllArticles, getSingleArticle} from "../../modules/article/article.controller";

const router = express.Router();

router.get("/", getAllArticles);
router.get("/:id", getSingleArticle);

export default router;