import { createContext, useState } from "react";

export const GameOneContext = createContext();

export const GameOneContextProvider = ({ children }) => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [blurScreen, setBlurScreen] = useState(false);
  const [newQuestions, setNewQuestions] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const value = {
    categoryName,
    setCategoryName,
    categories,
    setCategories,
    blurScreen,
    setBlurScreen,
    newQuestions,
    setNewQuestions,
    activeCategory,
    setActiveCategory,
  };
  return (
    <GameOneContext.Provider value={value}>{children}</GameOneContext.Provider>
  );
};
