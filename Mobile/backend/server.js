import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/db.js";

import ContestData from "./routes/getContestData.js";
import PlatformData from "./routes/getPlatformData.js";
import sendPlatforms from "./routes/platformRoutes.js";
import authRoutes from "./routes/userRoutes.js";
import userInfo from "./routes/getUserInfo.js";
// import notifyRoutes from "./routes/notify.js";

import isAuthorized from "./middlewares/isAuthorized.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use("/api/getContestData",ContestData);
app.use("/api/getPlatformData",PlatformData);
app.use("/api/auth",authRoutes);
app.use("/api/sendPlatforms",isAuthorized,sendPlatforms);
app.use("/api/getUserInfo",isAuthorized, userInfo);
// app.use("/api/notify", notifyRoutes);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on PORT:${PORT}`);
});
