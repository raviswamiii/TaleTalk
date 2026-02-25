import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export const LeftSideBar = ({ leftSideBar, setLeftSideBar }) => {
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
  }, [leftSideBar]);
  return (
    <div
      className={`bg-white h-screen absolute z-20 w-[70vw] transform transition-transform duration-300 ease-in-out ${leftSideBar ? "translate-x-0" : "-translate-x-[100vw]"}`}
      ref={leftSideBarRef}
    >
      <Link to="/questionContainer">
        <p className="text-black p-2 border-b">Question Container</p>
      </Link>
    </div>
  );
};
