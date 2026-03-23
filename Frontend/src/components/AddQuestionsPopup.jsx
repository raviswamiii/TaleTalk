import React, { useContext, useState } from "react";
import { GameOneContext } from "../context/GameOneContext";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";

export const AddQuestionsPopup = () => {
  const [error, setError] = useState("");
  const [addQuestion, setAddQuestion] = useState("");
  const { blurScreen, setBlurScreen, categoryName, setNewQuestions } =
    useContext(GameOneContext);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const addNewQuestion = async (e) => {
    e.preventDefault();

    if (!addQuestion.trim()) {
      setError("Question cannot be empty");
      return;
    }

    try {
      const response = await axios.post(`${backendURL}/gameOne/addQuestion`, {
        question: addQuestion.trim(),
        category: categoryName.trim(),
      });

      if (response.data.success) {
        setNewQuestions((prev) => [...prev, addQuestion.trim()]);
        setAddQuestion("");
        setBlurScreen(false);
        toast.success("Question added successfully");
      } else {
        toast.error("Failed to add question");
      }
    } catch (error) {
      console.error(
        "Error adding question:",
        error.response?.data || error.message,
      );
    }
  };
  return (
    <div
      className={`bg-black/60 h-screen fixed inset-0 z-30 
            backdrop-blur-md flex flex-col justify-center px-6 
            ${blurScreen ? "" : "hidden"}`}
    >
      <RxCross1
        onClick={() => setBlurScreen(false)}
        className="text-white text-xl absolute right-5 top-5 
              cursor-pointer hover:scale-110 transition"
      />

      <form
        onSubmit={addNewQuestion}
        className="bg-[#161214] w-full max-w-105 mx-auto 
              rounded-2xl p-6 flex flex-col gap-4 
              border border-white/10 shadow-2xl"
      >
        <h2 className="text-white text-lg font-semibold text-center tracking-wide">
          Add New Question
        </h2>

        {error && (
          <p className="text-red-400 text-center text-sm bg-red-900/20 py-1 rounded-md">
            {error}
          </p>
        )}

        <textarea
          placeholder="Type your question here..."
          className="w-full h-[22vh] px-4 py-3 rounded-xl 
                bg-[#0B090A] text-white
                border border-white/10 resize-none outline-none
                placeholder-gray-400
                focus:border-blue-500 transition"
          value={addQuestion}
          onChange={(e) => setAddQuestion(e.target.value)}
        />

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 
                  w-full rounded-xl text-white py-2.5 
                  font-semibold tracking-wide transition 
                  shadow-lg"
          >
            Save Question
          </button>
        </div>
      </form>
    </div>
  );
};
