/**
 * @swagger
 * /api/nlp:
 *   post:
 *     summary: Extract keywords and classify article topics
 *     tags:
 *       - NLP
 *     responses:
 *       200:
 *         description: NLP processing completed
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               processed: 12
 *       500:
 *         description: Server error
 */

import express from "express";
import {processedArticle} from "../../modules/nlp/nlp.controller";

const router = express.Router();

router.post(
    "/",
    processedArticle
);

export default router;