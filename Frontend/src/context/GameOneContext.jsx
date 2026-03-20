import { createContext, useState } from "react";

export const GameOneContext = createContext();

export const GameOneContextProvider = ({ children }) => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);

  const value = {
    categoryName,
    setCategoryName,
    categories,
    setCategories,
  };
  return (
    <GameOneContext.Provider value={value}>{children}</GameOneContext.Provider>
  );
};
