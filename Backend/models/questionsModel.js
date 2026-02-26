import mongoose from "mongoose";

const questions = new mongoose.Schema(
  {
    question: { type: String, required: true },
  },
  { timestamps: true },
);

const questionsModel = mongoose.model.questions || mongoose.model("questions", questions);

export default questionsModel;