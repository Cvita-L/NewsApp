import express from "express";

import { searchArticles } from "../controllers/search.js";

const router = express.Router();

router.get("/", searchArticles);

export default router;