import React, { useContext, useEffect, useRef } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { GameOneContext } from "../context/GameOneContext";
import axios from "axios";
import { toast } from "react-toastify";

export const CategoryActionButtons = () => {
  const { setActiveCategory, categoryName, setCategories } =
    useContext(GameOneContext);
  const actionRef = useRef(null);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const deleteCategory = async () => {
    try {
      if (!categoryName || !categoryName.trim()) {
        toast.error("No category selected");
        return;
      }
      const response = await axios.delete(
        `${backendURL}/gameOne/deleteCategory/${encodeURIComponent(categoryName.trim())}`,
      );

      if (response.data.success) {
        setCategories((prev) =>
          prev.filter((item) => item.category !== categoryName),
        );
        setActiveCategory(null);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

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

      <div
        onClick={deleteCategory}
        className="text-red-500 flex items-center gap-3 cursor-pointer hover:text-red-400"
      >
        <RiDeleteBin6Fill />
        <p>Delete</p>
      </div>
    </div>
  );
};
