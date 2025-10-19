import express from "express";
import { storePlatforms } from "../controllers/storePlatformController.js";

const router = express.Router();

router.post("/storePlatforms",storePlatforms);

export default router;