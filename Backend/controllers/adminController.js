import questionsModel from "../models/questionsModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import adminModel from "../models/adminModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

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

export const adminSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All details are required",
      });
    }

    const adminCount = await adminModel.countDocuments();

    if (adminCount >= 1) {
      return res.status(403).json({
        success: false,
        message: "Admin already exists. Please sign in.",
      });
    }

    if (!validator.isEmail(email))
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });

    if (password.length < 8)
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new adminModel({
      name,
      email,
      password: hashedPassword,
    });

    const admin = await newAdmin.save();

    const token = createToken(admin._id);

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      token,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Error while signing up admin",
    });
  }
};

export const adminSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All the details are required",
      });
    }

    const admin = await adminModel.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = createToken(admin._id);

    return res.status(200).json({
      success: true,
      message: "Admin signed in successfully",
      token,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Error while signing in admin",
    });
  }
};
