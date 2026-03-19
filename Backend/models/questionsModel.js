import mongoose from "mongoose";

const questionsSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "All",
        "Met a person just now",
        "Added by me",
        "PickUp lines",
        "Shayari",
        "Jokes",
        "Flirting",
        "Roasting",
      ],
    },
  },
  { timestamps: true },
);

const questionsModel =
  mongoose.models.Questions || mongoose.model("Questions", questionsSchema);

export default questionsModel;
