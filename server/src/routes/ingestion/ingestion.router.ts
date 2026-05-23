/**
 * @swagger
 * /api/ingestion:
 *   post:
 *     summary: Fetch and store news articles from RSS feeds
 *     tags:
 *       - Ingestion
 *     responses:
 *       200:
 *         description: Ingestion completed
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               articlesStored: 10
 *       500:
 *         description: Server error
 */

import express from "express";
import { ingestNews} from "../../modules/ingestion/ingestion.controller";

const router = express.Router();

router.post("/", ingestNews);
export default router;