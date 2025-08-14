import express from "express";
import {getAllPlatforms, getPersonalPlatforms} from "../controllers/contestDataController.js";
import isAuthorized from "../middlewares/isAuthorized.js";

const router = express.Router();

router.get("/",getAllPlatforms);
router.get("/getPersonalPlatforms",isAuthorized,getPersonalPlatforms);

export default router;