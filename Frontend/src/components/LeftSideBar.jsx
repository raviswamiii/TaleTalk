import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { SiReaddotcv } from "react-icons/si";
import { FcSearch } from "react-icons/fc";

export const LeftSideBar = ({
  leftSideBar,
  setLeftSideBar,
  setShowCategoryPanel,
}) => {
  const leftSideBarRef = useRef();

  useEffect(() => {
    const handleleftSideBarClick = (e) => {
      if (
        leftSideBar &&
        leftSideBarRef.current &&
        !leftSideBarRef.current.contains(e.target)
      ) {
        setLeftSideBar(false);
      }
    };

    document.addEventListener("mousedown", handleleftSideBarClick);
    return () => {
      document.removeEventListener("mousedown", handleleftSideBarClick);
    };
  }, [leftSideBar, setLeftSideBar]);

  return (
    <div
      className={`bg-[#0B090A] h-screen absolute z-20 w-[70vw] 
      transform transition-transform duration-300 ease-in-out 
      border-r border-white/10 shadow-2xl
      ${leftSideBar ? "translate-x-0" : "-translate-x-[100vw]"}`}
      ref={leftSideBarRef}
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
          />
        </div>

        <SiReaddotcv
          onClick={() => setShowCategoryPanel(true)}
          className="text-white text-2xl"
        />
      </div>

      <Link to="/game/all">
        <p className="text-gray-300 p-3 border-b border-white/5 hover:bg-white/5 hover:text-white transition">
          All
        </p>
      </Link>

      <Link to="/game/added-by-me">
        <p className="text-gray-300 p-3 border-b border-white/5 hover:bg-white/5 hover:text-white transition">
          Added by me
        </p>
      </Link>

      <Link to="/game/pickup-lines">
        <p className="text-gray-300 p-3 border-b border-white/5 hover:bg-white/5 hover:text-white transition">
          PickUp lines
        </p>
      </Link>

      <Link to="/game/shayriya">
        <p className="text-gray-300 p-3 border-b border-white/5 hover:bg-white/5 hover:text-white transition">
          Shayriya
        </p>
      </Link>

      <Link to="/game/jokes">
        <p className="text-gray-300 p-3 border-b border-white/5 hover:bg-white/5 hover:text-white transition">
          Jokes
        </p>
      </Link>

      <Link to="/game/flirting">
        <p className="text-gray-300 p-3 border-b border-white/5 hover:bg-white/5 hover:text-white transition">
          Flirting
        </p>
      </Link>
    </div>
  );
};
