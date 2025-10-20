import express from "express";
import { register, login, logout, checkAuth } from "../controllers/userController.js";
import isAuthorized from "../middlewares/isAuthorized.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check",isAuthorized,checkAuth);

export default router;
