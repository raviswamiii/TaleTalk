import React, { useEffect, useState } from "react";
import { MdManageAccounts } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { LeftSideBar } from "../components/LeftSideBar";
import axios from "axios";

export const QuestionContainer = () => {
  const [leftSideBar, setLeftSideBar] = useState(false);
  const [allQuestions, setAllQuestions] = useState([]);
  const questions = [
    { question: "kjgjafgjlkdjgjsflgjfjgjgjjgjgjfgjk" },
    { question: "kjgjafgjlkdjgjsflgjfjgjgjjgjgjfgjk" },
    { question: "kjgjafgjlkdjgjsflgjfjgjgjjgjgjfgjk" },
    { question: "kjgjafgjlkdjgjsflgjfjgjgjjgjgjfgjk" },
  ];
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
      console.error(error.response?.data?.message || error.message);
    }
  }

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  return (
    <div className="h-screen relative z-10 bg-[#0B090A] flex flex-col">
      <div className="bg-[#161214] text-white px-3 py-3 flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <HiMenuAlt2
            onClick={() => setLeftSideBar(true)}
            className="text-2xl"
          />
          <h1 className="font-semibold text-lg">All Questions</h1>
        </div>
        <MdManageAccounts className="text-2xl" />
      </div>

      <LeftSideBar leftSideBar={leftSideBar} setLeftSideBar={setLeftSideBar} />

      <div className="h-screen p-6 overflow-y-scroll">
        {allQuestions.length > 0
          ? allQuestions.map((question, index) => {
              return (
                <div
                  key={index}
                  className={`rounded-xl mb-4 flex justify-center items-center overflow-hidden p-5 bg-red-900`}
                >
                  <p className="text-white font-semibold text-center w-full wrap-break-word">
                    {question.question}
                  </p>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};
