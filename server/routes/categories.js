import express from "express";

import { getHome, getByCategory } from "../controllers/categories.js";

const router = express.Router();

router.get("/home", getHome);
router.get("/", getByCategory);

export default router;