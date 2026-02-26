import questionsModel from "../models/questionsModel.js";

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await questionsModel.find({});
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

export const deleteQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    await questionsModel.findByIdAndDelete(questionId);
    return res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Error while deleting question",
    });
  }
};
