import React, { useEffect, useState } from "react";
import { QuestionContainer } from "./components/QuestionContainer";
import { Route, Routes, Navigate } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";

export const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : "",
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  },[token]);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            token === "" ? (
              <SignIn setToken={setToken} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />

        <Route
          path="/signUp"
          element={
            token === "" ? (
              <SignUp setToken={setToken} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />

        <Route
          path="/dashboard"
          element={token !== "" ? <QuestionContainer /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};
