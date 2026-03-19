import gameOneModel from "../models/questionsModel.js";

export const addQuestion = async (req, res) => {
  try {
    const { question, category } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    const newQuestion = new gameOneModel({
      question: question.trim(),
      category,
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
    const category = decodeURIComponent(req.params.category);

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    const count = await gameOneModel.countDocuments({ category });

    const questions = await gameOneModel.aggregate([
      { $match: { category } },  
      { $sample: { size: count || 1 } }, 
    ]);

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