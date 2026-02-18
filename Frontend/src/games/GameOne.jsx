import React, { useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { RiAddLine } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";

export const GameOne = () => {
  const [blurScreen, setBlurScreen] = useState(false);
  const newQuestions = [
    { question: "What is the capital of France?" },
    { question: "Who wrote 'Romeo and Juliet'?" },
    {
      question:
        "Who wrote 'Romeo and Julietglkjgkjkjgjgkjsdjglsjfgjdfskjglsjglsjfgjsjgljgl'?",
    },
    { question: "What is the largest planet in our solar system?" },
  ];
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const generateQuestions = () => {
    if (currentIndex >= newQuestions.length) return;
    setQuestions((prev) => [newQuestions[currentIndex], ...prev]);
    setCurrentIndex((prev) => prev + 1);
  };

  const addNewQuestion = () => {};
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
        className={`bg-black/40 h-screen absolute inset-0 z-20 backdrop-blur-sm ${blurScreen ? "" : "hidden"}`}
      >
        <RxCross1
          onClick={() => setBlurScreen(false)}
          className="text-white text-lg absolute right-4 top-3"
        />
      </div>

      <div className="h-screen p-6 overflow-y-scroll">
        {questions.length > 0
          ? questions.map((question, index) => {
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
          : ""}

        {/* <div className="bg-green-500 h-[60vh] rounded-xl"></div> */}
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
