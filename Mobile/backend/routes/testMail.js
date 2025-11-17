import express from "express";
import { sendTestEmail } from "../controllers/testEmailController.js";

const router = express.Router();

router.post("/email", sendTestEmail);

export default router;
