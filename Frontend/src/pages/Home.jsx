import React, { useState } from "react";
import { MdManageAccounts } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import game1 from "../assets/image1.jpg";
import game2 from "../assets/download (2).jpg";
import game3 from "../assets/download (3).jpg";
import game4 from "../assets/download (4).jpg";
import game5 from "../assets/JK.jpg";
import game6 from "../assets/Kageyama.jpg";
import game7 from "../assets/ppnaravit.jpg";
import game8 from "../assets/image8.jpg";
import { Link } from "react-router-dom";

export const Home = () => {
  const games = [
    { id: 1, name: "Question Generator", img: game1, link: "/gameOne" },
    { id: 2, name: "Game name", img: game2 },
    { id: 3, name: "Game name", img: game3 },
    { id: 4, name: "Game name", img: game4 },
    { id: 5, name: "Game name", img: game5 },
    { id: 6, name: "Game name", img: game6 },
    { id: 7, name: "Game name", img: game7 },
    { id: 8, name: "Game name", img: game8 },
  ];
  return (
    <div className="h-screen bg-[#0B090A] flex flex-col">
      <div className="bg-[#161214] text-white px-3 py-3 flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <HiMenuAlt2 className="text-2xl" />
          <h1 className="font-semibold text-lg">Tale Talk</h1>
        </div>
        <MdManageAccounts className="text-2xl" />
      </div>

      <div className="overflow-y-auto p-9 sm:p-10 md:p-11 lg:p-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {games.map((game) => (
          <Link
            to={game.link || "#"}
            key={game.id}
            className="relative h-48 sm:h-56 md:h-60 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <img
              src={game.img}
              alt={game.name}
              className="w-full h-full object-cover"
            />

            <div className="absolute bottom-2 w-full flex justify-center">
              <p className="bg-black/60 backdrop-blur-md text-white text-xs sm:text-sm font-semibold px-4 py-1 rounded-full shadow-lg whitespace-nowrap truncate max-w-27.5 sm:max-w-50 md:max-w-40 xl:max-w-55">
                {game.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
