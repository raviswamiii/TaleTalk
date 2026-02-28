import React, { useEffect, useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { RiAddLine } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";
import { LeftSideBar } from "../components/LeftSideBar";
import { AddCategoryPopup } from "../components/AddCategoryPopup";

export const GameOne = () => {
  const [blurScreen, setBlurScreen] = useState(false);
  const [addQuestion, setAddQuestion] = useState("");
  const [newQuestions, setNewQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState("");
  const [leftSideBar, setLeftSideBar] = useState(false);
  const [showCategoryPanel, setShowCategoryPanel] = useState(false);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const addNewQuestion = async (e) => {
    e.preventDefault();

    if (!addQuestion.trim()) {
      setError("Question cannot be empty");
      return;
    }

    try {
      const response = await axios.post(`${backendURL}/gameOne/addQuestion`, {
        addQuestion: addQuestion.trim(),
      });

      if (response.data.success) {
        setNewQuestions((prev) => [...prev, response.data.data]);
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

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${backendURL}/gameOne/getQuestions`);

      if (response.data.success) {
        setNewQuestions(response.data.data);
        setCurrentIndex(0);
      } else {
        console.log("Failed to fetch questions:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching questions:", error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const generateQuestions = () => {
    if (newQuestions.length === 0) {
      toast.error("No questions available. Please add questions first!");
      return;
    }

    if (currentIndex >= newQuestions.length) {
      toast.info("No more new questions to generate!");
      return;
    }

    setQuestions((prev) => [newQuestions[currentIndex], ...prev]);

    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="relative h-screen bg-[#0B090A] flex flex-col z-10">
      <div className="bg-[#161214] text-white px-3 py-3 flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <HiMenuAlt2
            onClick={() => setLeftSideBar(true)}
            className="text-2xl"
          />
          <h1 className="font-semibold text-lg">Question Generator</h1>
        </div>

        <RiAddLine onClick={() => setBlurScreen(true)} className="text-2xl" />
      </div>

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

      <div className="h-screen p-6 overflow-y-scroll">
        {questions.length > 0 ? (
          questions.map((question, index) => {
            const isLatest = index === 0;

            return (
              <div
                key={index}
                className={`rounded-xl mb-4 flex justify-center items-center overflow-hidden p-5 ${
                  isLatest ? "bg-blue-900" : "bg-red-900"
                }`}
              >
                <p className="text-white font-semibold text-center w-full wrap-break-word">
                  {question.question}
                </p>
              </div>
            );
          })
        ) : (
          <p className="text-gray-400 text-center mt-10">
            No questions generated yet. Click the button below to generate
            questions.
          </p>
        )}
      </div>

      <div className="absolute bottom-0 w-full flex flex-col items-center">
        <div className="absolute bottom-3 bg-[#0B090A] h-18 w-18 rounded-full flex justify-center items-center">
          <button
            onClick={generateQuestions}
            className="bg-white h-13 w-13 rounded-full"
          />
        </div>

        <div className="bg-white h-[7vh] w-full" />
      </div>

      <LeftSideBar
        leftSideBar={leftSideBar}
        setLeftSideBar={setLeftSideBar}
        setShowCategoryPanel={setShowCategoryPanel}
      />

      <AddCategoryPopup
        showCategoryPanel={showCategoryPanel}
        setShowCategoryPanel={setShowCategoryPanel}
      />
    </div>
  );
};
