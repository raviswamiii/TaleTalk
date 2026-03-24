import React, { useContext, useEffect, useRef } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { GameOneContext } from "../context/GameOneContext";

export const CategoryActionButtons = () => {
  const { setActiveCategory } = useContext(GameOneContext);
  const actionRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (actionRef.current && !actionRef.current.contains(e.target)) {
        setActiveCategory(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      ref={actionRef}
      className="absolute right-9 top-2 flex flex-col gap-2 bg-black w-[42vw] rounded-2xl p-4 shadow-lg z-30"
    >
      <RxCross2
        onClick={() => setActiveCategory(null)}
        className="text-gray-300 absolute right-3 top-3"
      />

      <div className="text-gray-300 flex items-center gap-3 cursor-pointer hover:text-white">
        <MdEdit />
        <p>Rename</p>
      </div>

      <div className="text-red-500 flex items-center gap-3 cursor-pointer hover:text-red-400">
        <RiDeleteBin6Fill />
        <p>Delete</p>
      </div>
    </div>
  );
};
