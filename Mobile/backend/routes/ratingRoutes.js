import express from "express";
import {
  getMultiPlatformRatings,
  updatePlatformHandles,
  getUserHandles,
} from "../controllers/ratingController.js";
import isAuthorized from "../middlewares/isAuthorized.js";

const router = express.Router();

router.get("/", isAuthorized, getMultiPlatformRatings);
router.get("/handles", isAuthorized, getUserHandles);
router.put("/handles", isAuthorized, updatePlatformHandles);

export default router;
