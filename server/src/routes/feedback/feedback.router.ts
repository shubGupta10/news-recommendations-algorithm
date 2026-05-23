/**
 * @swagger
 * /api/feedback:
 *   post:
 *     summary: Submit feedback for an article
 *     tags:
 *       - Feedback
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               articleId:
 *                 type: string
 *               action:
 *                 type: string
 *                 enum: [like, dislike]
 *           example:
 *             articleId: 665f8a2f1f4b8c2a9c123456
 *             action: like
 *     responses:
 *       201:
 *         description: Feedback submitted
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Feedback submitted
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/feedback/{userId}:
 *   get:
 *     summary: Get feedback for a user
 *     tags:
 *       - Feedback
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         example: 665f8a2f1f4b8c2a9c123456
 *     responses:
 *       200:
 *         description: Feedback list
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               feedback: []
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

import express from "express";
import {createFeedback, getFeedbackByUser} from "../../modules/feedback/feedback.controller";
import { requireAuth } from "../../middleware/auth.middleware";

const router = express.Router();

router.post("/", requireAuth, createFeedback);
router.get("/:userId", requireAuth, getFeedbackByUser);

export default router;