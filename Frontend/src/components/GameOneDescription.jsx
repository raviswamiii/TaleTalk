import React from "react";

export const GameOneDescription = () => {
  return (
    <div className="h-screen flex flex-col gap-4 justify-center text-gray-300 px-6 leading-relaxed">
      <h1 className="text-2xl font-semibold text-center">Description</h1>

      <p className="border border-gray-300 p-4 rounded-2xl">
        Game One generates random topics and questions to help you start conversations and avoid awkward silence.
      </p>

      <p className="border border-gray-300 p-4 rounded-2xl">
        Click the menu button, choose a category, then press the button below to generate topics and questions.
      </p>

      <p className="border border-gray-300 p-4 rounded-2xl">
        You can also create your own categories and add custom topics and questions.
      </p>
    </div>
  );
};