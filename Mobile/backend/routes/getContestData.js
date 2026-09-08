import express from "express";
import { getContestData, getPersonalizedContests } from "../controllers/contestDataController.js";
import isAuthorized from "../middlewares/isAuthorized.js";

const router = express.Router();

router.get("/", getContestData);
router.get("/personalized", isAuthorized, getPersonalizedContests);

export default router;