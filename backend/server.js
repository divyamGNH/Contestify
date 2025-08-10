import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import ContestData from "./routes/getContestData.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use("/api/getContestData",ContestData);

app.listen(PORT, () => {
    console.log(`Server listening on PORT:${PORT}`);
});
