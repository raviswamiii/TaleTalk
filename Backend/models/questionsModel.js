import mongoose from "mongoose";

const questionsSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    questions: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

const questionsModel =
  mongoose.models.Questions || mongoose.model("Questions", questionsSchema);

export default questionsModel;
