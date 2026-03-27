import questionsModel from "../models/questionsModel.js";

let cache = {};

export const addCategory = async (req, res) => {
  try {
    const { category } = req.body;

    if (!category || !category.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    const normalizedCategory = category.trim().toLowerCase();

    const existingCategory = await questionsModel.findOne({
      category: normalizedCategory,
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const newCategory = new questionsModel({
      category: category.trim(),
      questions: [],
    });

    await newCategory.save();

    return res.status(201).json({
      success: true,
      message: "Category added successfully",
      data: newCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error adding category",
      error: error.message,
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await questionsModel.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching categories",
      error: error.message,
    });
  }
};

export const addQuestion = async (req, res) => {
  try {
    const { question, category } = req.body;
    if (!question || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }
    if (!category || !category.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    const updatedDocument = await questionsModel.findOneAndUpdate(
      { category: category.trim() },
      { $addToSet: { questions: question.trim() } },
      { returnDocument: "after", upsert: true },
    );

    return res.status(201).json({
      success: true,
      message: "Question added successfully",
      data: updatedDocument,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error adding question",
      error: error.message,
    });
  }
};

export const getQuestionsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const data = await questionsModel.findOne({
      category: { $regex: `^${category}$`, $options: "i" },
    });

    if (!data) {
      return res.status(400).json({
        success: false,
        message: "No category found",
      });
    }

    return res.status(201).json({
      success: true,
      questions: data.questions || [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error getting questions by category",
      error: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { category } = req.params;

    if (!category || !category.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    const deleted = await questionsModel.findOneAndDelete({
      category: category.trim(),
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting category",
      error: error.message,
    });
  }
};
