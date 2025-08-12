import express from "express";
import {getAllPlatforms} from "../controllers/contestDataController.js";

const router = express.Router();

router.get("/",getAllPlatforms);

export default router;