import "dotenv/config";
import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;
import databaseConnection from "./config/mongodb.js";
import gameOneRouter from "./routes/gameOneRoutes.js";
import cors from "cors";
import adminRouter from "./routes/adminRoutes.js";

databaseConnection();

// app.use(cors({
//   origin: process.env.FRONTEND_URL,
//   credentials: true,
// }))


// const allowedOrigins = process.env.ALLOWED_ORIGINS
//   ? process.env.ALLOWED_ORIGINS.split(",")
//   : [];

// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin) return callback(null, true); // Postman, server-to-server

//     if (allowedOrigins.includes(origin)) {
//       return callback(null, true);   // ✅ STOP here
//     } else {
//       console.log("❌ Blocked by CORS:", origin);
//       return callback(null, false);  // ❌ blocked safely
//     }
//   },
//   methods: ["GET","POST","PUT","PATCH","DELETE"],
//   credentials: true,
//   allowedHeaders: ["Content-Type","Authorization"]
// }));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/gameOne", gameOneRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
