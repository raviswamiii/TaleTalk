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
      data: newQuestion,
    });
  } catch (error) {
    console.error("Error adding question:", error);
    return res.status(500).json({
      success: false,
      message: "Error adding question",
      error: error.message,
    });
  }
};

export const getQuestions = async (req, res) => {
  try {
    const questions = await gameOneModel.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Questions fetched successfully",
      data: questions,
    });
  } catch (error) {
    console.log("Error fetching questions:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching questions",
      error: error.message,
    });
  }
};
