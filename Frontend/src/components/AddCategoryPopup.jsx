import React from 'react'
import { RxCross1 } from "react-icons/rx";

export const AddCategoryPopup = ({ showCategoryPanel, setShowCategoryPanel }) => {
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
  )
}
