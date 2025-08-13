import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/db.js";

import ContestData from "./routes/getContestData.js";
import PlatformData from "./routes/getPlatformData.js";
import authRoutes from "./routes/userRoutes.js";
import sendPlatforms from "./routes/platformRoutes.js";

import isAuthorized from "./middlewares/isAuthorized.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

app.listen(PORT, () => {
    console.log(`Server listening on PORT:${PORT}`);
});
