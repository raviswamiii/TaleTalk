import mongoose from "mongoose";

const gameOneSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
  },
  { timestamps: true },
);

const gameOne = mongoose.model.GameOne || mongoose.model("GameOne", gameOneSchema);

export default gameOne;