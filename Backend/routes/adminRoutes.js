import express from "express";
import { adminSignIn, deleteQuestion, getAllQuestions } from "../controllers/adminController.js";
const adminRouter = express.Router();

adminRouter.get("/getAllQuestions", getAllQuestions);
adminRouter.delete("/deleteQuestion/:questionId", deleteQuestion);
adminRouter.post("/signIn", adminSignIn);

export default adminRouter;
