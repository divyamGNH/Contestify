import express from "express";
import { storePlatforms, removePlatforms } from "../controllers/storePlatformController.js";

const router = express.Router();

router.post("/storePlatforms",storePlatforms);
router.post("/removePlatforms", removePlatforms)

export default router;