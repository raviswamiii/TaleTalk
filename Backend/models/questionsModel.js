import mongoose from "mongoose";

const questionsSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true,
    },

    question: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true },
);

const questionsModel =
  mongoose.models.Questions || mongoose.model("Questions", questionsSchema);

export default questionsModel;
