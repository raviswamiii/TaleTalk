import express from "express";
import { addCategory, addQuestion, getCategories } from "../controllers/gameOneControllers.js";
const gameOneRouter = express.Router();

// gameOneRouter.post("/addQuestion", addQuestion);
// gameOneRouter.get("/getQuestions/:category", getQuestions);
gameOneRouter.post("/addCategory", addCategory);
gameOneRouter.get("/getCategories", getCategories);
gameOneRouter.post("/addQuestion", addQuestion);

export default gameOneRouter;