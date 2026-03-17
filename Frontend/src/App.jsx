import React from 'react'
import { Home } from './pages/Home.jsx'
import { Routes, Route } from 'react-router-dom'
import { GameOne } from './games/GameOne.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { JustMetAPerson } from './components/JustMetAPerson.jsx';

export const App = () => {
  return (
    <>
    <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/gameOne' element={<GameOne />} />
        <Route path='/justmetaperson' element={<JustMetAPerson />} />
      </Routes>
    </>
  )
}
