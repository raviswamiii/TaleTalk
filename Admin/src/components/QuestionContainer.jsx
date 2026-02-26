import React, { useEffect, useState } from "react";
import { MdManageAccounts } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { LeftSideBar } from "../components/LeftSideBar";
import { RiDeleteBin6Fill } from "react-icons/ri";
import axios from "axios";

export const QuestionContainer = () => {
  const [leftSideBar, setLeftSideBar] = useState(false);
  const [allQuestions, setAllQuestions] = useState([]);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const fetchAllQuestions = async () => {
    try {
      const response = await axios.get(`${backendURL}/admin/getAllQuestions`);
      if (response.data.success) {
        setAllQuestions(response.data.data);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      const response = await axios.delete(
        `${backendURL}/admin/deleteQuestion/${questionId}`,
      );
      if (response.data.success) {
        setAllQuestions(prev => prev.filter(q => q._id !== questionId));
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
  fetchAllQuestions();

  const interval = setInterval(() => {
    fetchAllQuestions();
  }, 3000);

  return () => clearInterval(interval);
}, []);

  return (
    <div className="h-screen relative z-10 bg-[#0B090A] flex flex-col">
      <div className="bg-[#161214] text-white px-3 py-3 flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <HiMenuAlt2
            onClick={() => setLeftSideBar(true)}
            className="text-2xl"
          />
          <h1 className="font-semibold text-lg">
            All Questions ({allQuestions.length})
          </h1>
        </div>
        <MdManageAccounts className="text-2xl" />
      </div>

      <LeftSideBar leftSideBar={leftSideBar} setLeftSideBar={setLeftSideBar} />

      <div className="h-screen p-6 overflow-y-scroll">
        {allQuestions.length > 0 ? (
          allQuestions
            .slice()
            .reverse()
            .map((question) => {
              return (
                <div
                  key={question._id}
                  className={`rounded-xl mb-4 flex justify-center items-center overflow-hidden p-5 bg-red-900`}
                >
                  <p className="text-white font-semibold text-center w-full wrap-break-word">
                    {question.question}
                  </p>
                  <RiDeleteBin6Fill
                    onClick={() => handleDeleteQuestion(question._id)}
                    className="text-white text-lg cursor-pointer"
                  />
                </div>
              );
            })
        ) : (
          <p className="text-gray-400 text-center mt-10">
            No questions added yet.
          </p>
        )}
      </div>
    </div>
  );
};
