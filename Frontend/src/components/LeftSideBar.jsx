import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { SiReaddotcv } from "react-icons/si";
import { FcSearch } from "react-icons/fc";
import { GameOneContext } from "../context/GameOneContext";

export const LeftSideBar = ({
  leftSideBar,
  setLeftSideBar,
  setShowCategoryPanel,
}) => {
  const leftSideBarRef = useRef();
  const { setCategoryName } = useContext(GameOneContext);

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

      <Link to="/">
        <p
          onClick={() => {
            setLeftSideBar(false);
            setCategoryName("All");
          }}
          className="text-gray-300 p-3 border-b border-white/5 hover:bg-white/5 hover:text-white transition"
        >
          All
        </p>
      </Link>

      <Link to="/justmetaperson">
        <p
          onClick={() => {
            setLeftSideBar(false);
            setCategoryName("Met a person just now");
          }}
          className="text-gray-300 p-3 border-b border-white/5 hover:bg-white/5 hover:text-white transition"
        >
          Met a person just now
        </p>
      </Link>

      {/* <Link to="/added-by-me">
        <p
          onClick={() => {
            setLeftSideBar(false);
            setCategoryName("Added by me");
          }}
          className="text-gray-300 p-3 border-b border-white/5 hover:bg-white/5 hover:text-white transition"
        >
          Added by me
        </p>
      </Link> */}

      <Link to="/pickup-lines">
        <p
          onClick={() => {
            setLeftSideBar(false);
            setCategoryName("Pickup lines");
          }}
          className="text-gray-300 p-3 border-b border-white/5 hover:bg-white/5 hover:text-white transition"
        >
          Pickup lines
        </p>
      </Link>

      <Link to="/poetries">
        <p
          onClick={() => {
            setLeftSideBar(false);
            setCategoryName("Poetries");
          }}
          className="text-gray-300 p-3 border-b border-white/5 hover:bg-white/5 hover:text-white transition"
        >
          Poetries
        </p>
      </Link>

      <Link to="/jokes">
        <p
          onClick={() => {
            setLeftSideBar(false);
            setCategoryName("Jokes");
          }}
          className="text-gray-300 p-3 border-b border-white/5 hover:bg-white/5 hover:text-white transition"
        >
          Jokes
        </p>
      </Link>

      <Link to="/flirting">
        <p
          onClick={() => {
            setLeftSideBar(false);
            setCategoryName("Flirting");
          }}
          className="text-gray-300 p-3 border-b border-white/5 hover:bg-white/5 hover:text-white transition"
        >
          Flirting
        </p>
      </Link>

      <Link to="/roasting">
        <p
          onClick={() => {
            setLeftSideBar(false);
            setCategoryName("Roasting");
          }}
          className="text-gray-300 p-3 border-b border-white/5 hover:bg-white/5 hover:text-white transition"
        >
          Roasting
        </p>
      </Link>
    </div>
  );
};
