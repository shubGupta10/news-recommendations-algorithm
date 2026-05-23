import express from "express";
import { ingestNews} from "../../modules/ingestion/ingestion.controller";

const router = express.Router();

router.post("/", ingestNews);
export default router;