import express from "express";
import { addCategory, getCategories } from "../controllers/gameOneControllers.js";
const gameOneRouter = express.Router();

// gameOneRouter.post("/addQuestion", addQuestion);
// gameOneRouter.get("/getQuestions/:category", getQuestions);
gameOneRouter.post("/addCategory", addCategory);
gameOneRouter.get("/getCategories", getCategories);

export default gameOneRouter;