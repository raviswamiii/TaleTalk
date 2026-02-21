import express from "express";
import { addQuestion } from "../controllers/gameOneControllers.js";
const gameOneRouter = express.Router();

gameOneRouter.post("/addQuestion", addQuestion);

export default gameOneRouter;