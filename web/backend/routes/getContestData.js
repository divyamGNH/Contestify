import express from "express";
import {getContestData} from "../controllers/contestDataController.js";

const router = express.Router();

router.get("/",getContestData);

export default router;