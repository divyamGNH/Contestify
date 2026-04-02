import express from "express";
import { suggestLeetCodeQuestions } from "../controllers/chatController.js";

const router = express.Router();

router.post("/leetcode-suggest", suggestLeetCodeQuestions);

export default router;
