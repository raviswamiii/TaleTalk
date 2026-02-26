import "dotenv/config";
import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;
import databaseConnection from "./config/mongodb.js";
import gameOneRouter from "./routes/gameOneRoutes.js";
import cors from "cors";
import adminRouter from "./routes/adminRoutes.js";

databaseConnection();

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "").split(",");

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.log("❌ Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type","Authorization"],
  maxAge: 86400
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/gameOne", gameOneRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
