import express from "express";
import { addQuestion, getQuestions } from "../controllers/gameOneControllers.js";
const gameOneRouter = express.Router();

gameOneRouter.post("/addQuestion", addQuestion);
gameOneRouter.get("/getQuestions", getQuestions);

export default gameOneRouter;