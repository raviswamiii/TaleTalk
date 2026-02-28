import React, { useEffect, useState } from "react";
import { QuestionContainer } from "./components/QuestionContainer";
import { Route, Routes } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";

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
        <Routes>
          <Route path="/" element={<SignIn setToken={setToken} />} />
          <Route path="/signUp" element={<SignUp setToken={setToken} />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<QuestionContainer />} />
        </Routes>
      )}
    </div>
  );
};
