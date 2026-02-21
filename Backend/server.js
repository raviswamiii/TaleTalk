import "dotenv/config";
import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;
import databaseConnection from "./config/mongodb.js";
import gameOneRouter from "./routes/gameOneRoutes.js";
import cors from "cors";

databaseConnection();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/gameOne", gameOneRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
