import "dotenv/config";
import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;
import databaseConnection from "./config/mongodb.js";

databaseConnection();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
