import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SiReaddotcv } from "react-icons/si";
import { FcSearch } from "react-icons/fc";
import { GameOneContext } from "../context/GameOneContext";
import { HiDotsVertical } from "react-icons/hi";
import { CategoryActionButtons } from "./CategoryActionButtons";

export const LeftSideBar = ({
  leftSideBar,
  setLeftSideBar,
  setShowCategoryPanel,
}) => {
  const leftSideBarRef = useRef();
  const { categories, setCategoryName, activeCategory, setActiveCategory } =
    useContext(GameOneContext);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        leftSideBar &&
        leftSideBarRef.current &&
        !leftSideBarRef.current.contains(e.target)
      ) {
        setLeftSideBar(false);
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

          {activeCategory === item.category && <CategoryActionButtons />}
        </div>
      ))}
    </div>
  );
};
