import express from "express";
import { addCategory, addQuestion, deleteCategory, getCategories, getQuestionsByCategory } from "../controllers/gameOneControllers.js";
const gameOneRouter = express.Router();

gameOneRouter.post("/addCategory", addCategory);
gameOneRouter.get("/getCategories", getCategories);
gameOneRouter.post("/addQuestion", addQuestion);
gameOneRouter.get("/getQuestions/:category", getQuestionsByCategory);
gameOneRouter.delete("/deleteCategory/:category", deleteCategory)

export default gameOneRouter;