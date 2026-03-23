import React, { useContext, useEffect, useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { RiAddLine } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";
import { LeftSideBar } from "../components/LeftSideBar";
import { AddCategoryPopup } from "../components/AddCategoryPopup";
import { GameOneContext } from "../context/GameOneContext";
import { GameOneDescription } from "../components/GameOneDescription";
import { AddQuestionsPopup } from "../components/AddQuestionsPopup";

export const GameOne = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [leftSideBar, setLeftSideBar] = useState(false);
  const [showCategoryPanel, setShowCategoryPanel] = useState(false);
  const { categoryName, setBlurScreen, newQuestions, setNewQuestions } = useContext(GameOneContext);
  const [loading, setLoading] = useState(false);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  // const addNewQuestion = async (e) => {
  //   e.preventDefault();

  //   if (!addQuestion.trim()) {
  //     setError("Question cannot be empty");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(`${backendURL}/gameOne/addQuestion`, {
  //       question: addQuestion.trim(),
  //       category: categoryName.trim(),
  //     });

  //     if (response.data.success) {
  //       setNewQuestions((prev) => [...prev, response.data.data]);
  //       setAddQuestion("");
  //       setBlurScreen(false);
  //       toast.success("Question added successfully");
  //     } else {
  //       toast.error("Failed to add question");
  //     }
  //   } catch (error) {
  //     console.error(
  //       "Error adding question:",
  //       error.response?.data || error.message,
  //     );
  //   }
  // };

  // const fetchQuestions = async () => {
  //   if (!categoryName || categoryName.trim() === "") {
  //     console.log("Category is missing");
  //     return;
  //   }

  //   try {
  //     setLoading(true);

  //     const response = await axios.get(
  //       `${backendURL}/gameOne/getQuestions/${encodeURIComponent(categoryName)}`,
  //     );

  //     if (response.data.success) {
  //       setNewQuestions(response.data.data);
  //       setCurrentIndex(0);
  //     } else {
  //       console.log("Failed to fetch questions:", response.data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching questions:", error.response?.data?.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (categoryName) {
  //     fetchQuestions();
  //   }
  // }, [categoryName]);

  const fetchQuestions = async () => {
  if (!categoryName || categoryName.trim() === "") {
    console.log("Category is missing");
    return;
  }

  try {
    const response = await axios.get(
      `${backendURL}/gameOne/getQuestions/${encodeURIComponent(categoryName.trim())}`
    );


    if (response.data.success) {
      setNewQuestions(response.data.questions || []);
      setQuestions([]);
      setCurrentIndex(0);
    } else {
      console.log(response.data.message);
    }
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
};

  useEffect(() => {
  if (categoryName) {
    fetchQuestions();
  }
}, [categoryName]);

  const generateQuestions = () => {
    if (!newQuestions || newQuestions.length === 0) {
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
          <h1 className="font-semibold text-lg">
            {categoryName || "Tale Talk"}
          </h1>
        </div>

        {!categoryName?.trim() ? (
          ""
        ) : (
          <RiAddLine onClick={() => setBlurScreen(true)} className="text-2xl" />
        )}
      </div>

      {!categoryName?.trim() ? (
        <GameOneDescription />
      ) : (
        <>
          <AddQuestionsPopup />

          <div className="h-screen p-6 overflow-y-scroll">
            {loading ? (
              <div className="flex justify-center items-center h-[60vh]">
                <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : questions.length > 0 ? (
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
                      {question}
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
        </>
      )}

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
