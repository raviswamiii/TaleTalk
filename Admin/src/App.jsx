import React, { useEffect, useState } from "react";
import { QuestionContainer } from "./components/QuestionContainer";
import { Route, Routes } from "react-router-dom";
import { SignIn } from "./pages/SignIn";

export const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : "",
  );
  useEffect(() => {
    localStorage.setItem("token", token);
  });
  return (
    <div>
      {token === "" ? (
        <SignIn setToken={setToken} />
      ) : (
        <Routes>
          <Route path="/" element={<QuestionContainer />} />
        </Routes>
      )}
    </div>
  );
};
