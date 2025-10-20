import express from "express";
import {getUsername} from "../controllers/userInfoController.js"

const router = express.Router();

router.get("/getUsername", getUsername);

export default router;