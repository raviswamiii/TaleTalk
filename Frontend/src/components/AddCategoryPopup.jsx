import React from "react";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { GameOneContext } from "../context/GameOneContext";
import { useContext } from "react";
import axios from "axios";
import { useEffect } from "react";

export const AddCategoryPopup = ({
  showCategoryPanel,
  setShowCategoryPanel,
}) => {
  const { categoryName, setCategoryName, setCategories } = useContext(GameOneContext);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const addCategory = async (e) => {
    e.preventDefault();

    try {
      if (!categoryName.trim()) {
        return;
      }

      const response = await axios.post(`${backendURL}/gameOne/addCategory`, {
        category: categoryName.trim(),
      });

      if (response.data.success) {
        setCategories((prev) => [...prev, response.data.data]);
        setCategoryName("");
        setShowCategoryPanel(false);
        
      } else {
        console.log(response.data.message) 
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${backendURL}/gameOne/getCategories`);

      if (response.data.success) {
        setCategories(response.data.data);
      } else {
        console.log("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error.response?.data || error.message);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div
      className={`bg-black/60 h-screen fixed inset-0 z-30 
        backdrop-blur-md flex flex-col justify-center px-6 
        ${showCategoryPanel ? "" : "hidden"}`}
    >
      <RxCross1
        onClick={() => setShowCategoryPanel(false)}
        className="text-white text-xl absolute right-5 top-5 
          cursor-pointer hover:scale-110 transition"
      />

      <form
        onSubmit={addCategory}
        className="bg-[#161214] w-full max-w-105 mx-auto 
          rounded-2xl p-6 flex flex-col gap-4 
          border border-white/10 shadow-2xl"
      >
        <h2 className="text-white text-lg font-semibold text-center tracking-wide">
          Add New Category
        </h2>

        {/* {error && (
            <p className="text-red-400 text-center text-sm bg-red-900/20 py-1 rounded-md">
              {error}
            </p>
          )} */}

        <input
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          type="text"
          placeholder="Enter category name..."
          className="w-full px-4 py-3 rounded-xl 
            bg-[#0B090A] text-white
            border border-white/10 resize-none outline-none
            placeholder-gray-400
            focus:border-blue-500 transition"
        />

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 
              w-full rounded-xl text-white py-2.5 
              font-semibold tracking-wide transition 
              shadow-lg"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
