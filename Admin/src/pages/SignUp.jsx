import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const SignUp = ({ setToken }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendURL}/admin/signUp`, {
        name,
        email,
        password,
      });
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error.response?.data?.message || "server error");
    }
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-black flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
        <h1 className="text-white text-2xl font-bold text-center mb-2">
          Welcome to admin panel 👋
        </h1>
        <p className="text-gray-300 text-center mb-6 text-sm">
          Sign up to continue
        </p>

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
          <input
            className="bg-white/20 text-white placeholder-gray-300 p-3 w-full outline-none rounded-xl focus:ring-2 focus:ring-white/50 transition"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="bg-white/20 text-white placeholder-gray-300 p-3 w-full outline-none rounded-xl focus:ring-2 focus:ring-white/50 transition"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="bg-white/20 text-white placeholder-gray-300 p-3 w-full outline-none rounded-xl focus:ring-2 focus:ring-white/50 transition"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="mt-2 bg-white text-black p-3 rounded-xl font-bold hover:bg-gray-200 transition-all duration-300 active:scale-95"
          >
            Sign Up
          </button>
        </form>

        <Link to="/signIn" className="text-center mt-6 text-sm text-gray-300">
          Don’t have an account?{" "}
          <span className="text-white font-semibold cursor-pointer hover:underline">
            Sign In
          </span>
        </Link>
      </div>
    </div>
  );
};
