import React, { useEffect, useRef, useState } from "react";
import { MdManageAccounts } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";

import { Link } from "react-router-dom";
import { LeftSideBar } from "../components/LeftSideBar";

export const QuestionContainer = () => {
  const [leftSideBar, setLeftSideBar] = useState(false);
  const questions = [
    { question: "kjgjafgjlkdjgjsflgjfjgjgjjgjgjfgjk" },
    { question: "kjgjafgjlkdjgjsflgjfjgjgjjgjgjfgjk" },
    { question: "kjgjafgjlkdjgjsflgjfjgjgjjgjgjfgjk" },
    { question: "kjgjafgjlkdjgjsflgjfjgjgjjgjgjfgjk" },
  ];

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
        {questions.length > 0
          ? questions.map((question, index) => {
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
