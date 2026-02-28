import questionsModel from "../models/questionsModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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


export const adminSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    /* ---------- Validation ---------- */
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    /* ---------- Admin Credentials ---------- */
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminHashedPassword = process.env.ADMIN_PASSWORD_HASH; 
    // Store HASHED password in env, not plain text

    if (!adminEmail || !adminHashedPassword) {
      return res.status(500).json({
        success: false,
        message: "Admin configuration error",
      });
    }

    /* ---------- Email Check ---------- */
    if (email !== adminEmail) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    /* ---------- Password Check ---------- */
    const isPasswordValid = await bcrypt.compare(password, adminHashedPassword);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    /* ---------- JWT Token ---------- */
    const token = jwt.sign(
      {
        role: "admin",
        email: adminEmail,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h", // industry standard expiry
      }
    );

    return res.status(200).json({
      success: true,
      message: "Admin signed in successfully",
      token,
      admin: {
        email: adminEmail,
        role: "admin",
      },
    });

  } catch (error) {
    console.error("Admin SignIn Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const run = async () => {
  const hash = await bcrypt.hash("adminkapassword", 12);
  console.log(hash);
};

run();