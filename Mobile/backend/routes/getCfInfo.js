import express from "express";
import { getCfInfo, updateCfHandle, getUserHandle } from "../controllers/cfInfo.js";
import isAuthorized from "../middlewares/isAuthorized.js";

const router = express.Router();

// GET CF DETAILS (public)
router.get("/",isAuthorized, getCfInfo);

// GET CURRENT USER'S STORED CF HANDLE (requires login)
router.get("/getUserHandle", isAuthorized, getUserHandle);

// UPDATE CF HANDLE (requires login)
router.put("/updateCfHandle", isAuthorized, updateCfHandle);

export default router;
