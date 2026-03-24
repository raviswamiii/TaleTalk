import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SiReaddotcv } from "react-icons/si";
import { FcSearch } from "react-icons/fc";
import { GameOneContext } from "../context/GameOneContext";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";

export const LeftSideBar = ({
  leftSideBar,
  setLeftSideBar,
  setShowCategoryPanel,
}) => {
  const leftSideBarRef = useRef();
  const { categories, setCategoryName } = useContext(GameOneContext);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const actionRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      // 🔹 Close sidebar
      if (
        leftSideBar &&
        leftSideBarRef.current &&
        !leftSideBarRef.current.contains(e.target)
      ) {
        setLeftSideBar(false);
      }

      // 🔥 Close action buttons
      if (actionRef.current && !actionRef.current.contains(e.target)) {
        setActiveCategory(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [leftSideBar]);

  const filteredCategories = categories.filter((item) =>
    item.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div
      ref={leftSideBarRef}
      className={`bg-[#0B090A] h-screen absolute z-20 w-[70vw]
      transform transition-transform duration-300 ease-in-out
      border-r border-white/10 shadow-2xl
      ${leftSideBar ? "translate-x-0" : "-translate-x-[100vw]"}`}
    >
      <div className="p-4 flex items-center gap-3 border-b border-white/10 bg-[#161214]">
        <div className="relative w-full">
          <FcSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-lg opacity-80" />
          <input
            className="w-full pl-10 pr-4 py-2 rounded-full 
            bg-[#0B090A] text-white
            border border-white/10 outline-none
            placeholder-gray-400
            focus:border-blue-500 transition-all"
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <SiReaddotcv
          onClick={() => setShowCategoryPanel(true)}
          className="text-white text-2xl cursor-pointer"
        />
      </div>

      {filteredCategories.map((item, index) => (
        <div key={item._id || index} className="relative">
          <Link to={`/gameOne/${item.category}`}>
            <div
              onClick={() => {
                setLeftSideBar(false);
                setCategoryName(item.category);
              }}
              className="flex items-center justify-between text-gray-300 p-3 border-b border-white/5 hover:bg-white/5 hover:text-white transition cursor-pointer"
            >
              <p>{item.category}</p>
              <HiDotsVertical
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveCategory(item.category);
                }}
              />
            </div>
          </Link>

          {activeCategory === item.category && (
            <div
              ref={actionRef}
              className="absolute right-9 top-2 flex flex-col gap-2 bg-black w-[42vw] rounded-2xl p-4 shadow-lg z-30"
            >
              <RxCross2 onClick={() => setActiveCategory(null)} className="text-gray-300 absolute right-3 top-3"/>

              <div className="text-gray-300 flex items-center gap-3 cursor-pointer hover:text-white">
                <MdEdit />
                <p>Rename</p>
              </div>

              <div className="text-red-500 flex items-center gap-3 cursor-pointer hover:text-red-400">
                <RiDeleteBin6Fill />
                <p>Delete</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
