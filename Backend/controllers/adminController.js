import gameOneModel from "../models/gameOneModel.js";

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await gameOneModel.find({});
    return res.status(200).json({
      success: true,
      data: questions,
      message: "Questions fetched successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Error while fetching all questions" });
  }
};
