import express from "express";
import { adminSignIn, adminSignUp, deleteQuestion, getAllQuestions } from "../controllers/adminController.js";
const adminRouter = express.Router();

adminRouter.get("/getAllQuestions", getAllQuestions);
adminRouter.delete("/deleteQuestion/:questionId", deleteQuestion);
adminRouter.post("/signIn", adminSignIn);
adminRouter.post("/signUp", adminSignUp);

export default adminRouter;
