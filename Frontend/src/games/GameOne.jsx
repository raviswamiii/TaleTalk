import React, { useEffect, useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { RiAddLine } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";

export const GameOne = () => {
  const [blurScreen, setBlurScreen] = useState(false);
  const [addQuestion, setAddQuestion] = useState("");
  const [newQuestions, setNewQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState("");
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

  const fetchQuestions = async (e) => {
    try {
      const response = await axios.get(`${backendURL}/gameOne/getQuestions`);
      if (response.data.success) {
        setNewQuestions(response.data.data);
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
          <HiMenuAlt2 className="text-2xl" />
          <h1 className="font-semibold text-lg">Question Generator</h1>
        </div>
        <RiAddLine onClick={() => setBlurScreen(true)} className="text-2xl" />
      </div>

      <div
        className={`bg-black/40 h-screen absolute inset-0 z-20 backdrop-blur-sm flex flex-col justify-center px-8 ${blurScreen ? "" : "hidden"}`}
      >
        <RxCross1
          onClick={() => setBlurScreen(false)}
          className="text-white text-lg absolute right-4 top-3"
        />
        <form
          onSubmit={addNewQuestion}
          className="bg-gray-300 w-full rounded-xl p-4 flex flex-col gap-3"
        >
          {error && <p className="text-red-500 text-center">{error}</p>}

          <textarea
            placeholder="Type here..."
            className="w-full h-[20vh] px-3 py-1.5 rounded-lg border resize-none outline-none"
            value={addQuestion}
            onChange={(e) => setAddQuestion(e.target.value)}
          ></textarea>

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-green-500 w-full rounded-lg text-gray-300 py-2 font-semibold"
            >
              Save
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
                className={`rounded-xl mb-4 flex justify-center items-center overflow-hidden p-5 ${isLatest ? "bg-blue-900" : "bg-red-900"}`}
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
          ></button>
        </div>
        <div className="bg-white h-[7vh] w-full"></div>
      </div>
    </div>
  );
};
