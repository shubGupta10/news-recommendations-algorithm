import express from "express";
import {createFeedback, getFeedbackByUser} from "../../modules/feedback/feedback.controller";
import { requireAuth } from "../../middleware/auth.middleware";

const router = express.Router();

router.post("/", requireAuth, createFeedback);
router.get("/:userId", requireAuth, getFeedbackByUser);

export default router;