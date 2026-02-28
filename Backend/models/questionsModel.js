import mongoose from "mongoose";

const questions = new mongoose.Schema(
  {
    question: { type: String, required: true },
  },
  { timestamps: true },
);

const questionsModel = mongoose.models.Questions || mongoose.model("Questions", questions);

export default questionsModel;