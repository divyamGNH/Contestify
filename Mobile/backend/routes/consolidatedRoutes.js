import express from "express";
import { getConsolidatedData } from "../controllers/consolidatedController.js";
import isAuthorized from "../middlewares/isAuthorized.js";

const router = express.Router();

router.get("/", isAuthorized, getConsolidatedData);

export default router;
