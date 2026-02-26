import express from "express";
import { deleteQuestion, getAllQuestions } from "../controllers/adminController.js";
const adminRouter = express.Router();

adminRouter.get("/getAllQuestions", getAllQuestions);
adminRouter.delete("/deleteQuestion/:questionId", deleteQuestion);

export default adminRouter;
