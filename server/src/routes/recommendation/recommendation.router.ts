/**
 * @swagger
 * /api/recommendation:
 *   get:
 *     summary: Get personalized article recommendations using TF-IDF and cosine similarity
 *     tags:
 *       - Recommendation
 *     parameters:
 *       - in: query
 *         name: articleId
 *         required: true
 *         schema:
 *           type: string
 *         example: 665f8a2f1f4b8c2a9c123456
 *     responses:
 *       200:
 *         description: Recommended articles
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               recommendations: []
 *       500:
 *         description: Server error
 */

import express from "express";
import {recommendArticles} from "../../modules/recommendation/recommendation.controller";
import { optionalAuth } from "../../middleware/auth.middleware";

const router = express.Router();

router.get("/", optionalAuth, recommendArticles);

export default router;