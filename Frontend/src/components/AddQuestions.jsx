import React, { useState } from "react";
import { MdManageAccounts } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export const AddQuestions = () => {
    const navigate = useNavigate();
  return (
    <div className="h-screen bg-[#0B090A] flex flex-col">
      <div className="bg-[#161214] text-white px-3 py-3 flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <IoIosArrowBack  className="text-2xl" onClick={() => navigate(-1)} />
          <h1 className="font-semibold text-lg">Add new question</h1>
        </div>
        <MdManageAccounts className="text-2xl" />
      </div>
    </div>
  );
};
