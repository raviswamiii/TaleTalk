import mongoose from "mongoose";

const questionsSchema = new mongoose.Schema(
  {
    // question: {
    //   type: String,
    //   required: true,
    // },

    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const questionsModel =
  mongoose.models.Questions || mongoose.model("Questions", questionsSchema);

export default questionsModel;
