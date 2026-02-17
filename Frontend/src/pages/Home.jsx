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

export const Home = () => {
  const games = [
    { id: 1, name: "Game ", img: game1 },
    { id: 2, name: "Game name", img: game2 },
    { id: 3, name: "Game name", img: game3 },
    { id: 4, name: "Game name", img: game4 },
    { id: 5, name: "Game name", img: game5 },
    { id: 6, name: "Game name", img: game6 },
    { id: 7, name: "Game name", img: game7 },
    { id: 8, name: "Game name", img: game8 },
  ];
  return (
    <div className="h-screen bg-[#0B090A]">
      <div className="bg-[#161214] text-white px-3 py-2 flex items-center justify-between">
        <div className="flex gap-4">
          <HiMenuAlt2 className="text-2xl" />
          <h1 className="font-semibold">Tale Talk</h1>
        </div>
        <MdManageAccounts className="text-2xl" />
      </div>

      <div className="p-9 grid grid-cols-2 gap-6 overflow-y-scroll h-[90vh] ">
        {games.map((game) => {
          return (
            <div
              key={game.id}
              className="relative h-[27vh] rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <img
                src={game.img}
                alt={game.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 flex justify-center w-full">
                <p className="bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-4 py-1 rounded-full shadow-lg tracking-wide whitespace-nowrap mb-1">
                  {game.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
