import express from "express";
import { getAllQuestions } from "../controllers/adminController.js";
const adminRouter = express.Router();

adminRouter.get("/getAllQuestions", getAllQuestions);

export default adminRouter;
