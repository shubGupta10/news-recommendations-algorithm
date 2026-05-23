import express from "express";
import {recommendArticles} from "../../modules/recommendation/recommendation.controller";
import { optionalAuth } from "../../middleware/auth.middleware";

const router = express.Router();

router.get("/", optionalAuth, recommendArticles);

export default router;