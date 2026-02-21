import gameOneModel from "../models/gameOneModel.js";

export const addQuestion = async (req, res) => {
  try {
    const { addQuestion } = req.body;

    if (!addQuestion || !addQuestion.trim()) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const newQuestion = new gameOneModel({
      question: addQuestion.trim(),
    });

    await newQuestion.save();

    return res.status(201).json({
      success: true,
      message: "Question added successfully",
      data: newQuestion
    });

  } catch (error) {
    console.error("Error adding question:", error);
    return res.status(500).json({
      success: false,
      message: "Error adding question",
      error: error.message
    });
  }
};
