import express from "express";

import { register, login, getBusiness } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getBusiness", getBusiness);

export default router;