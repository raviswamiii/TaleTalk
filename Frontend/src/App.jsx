import React from 'react'
import { Home } from './pages/Home.jsx'
import { Routes, Route } from 'react-router-dom'
import { GameOne } from './games/GameOne.jsx'
import { AddQuestions } from './components/AddQuestions.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QuestionContainer } from '../../Admin/src/components/QuestionContainer.jsx'

export const App = () => {
  return (
    <>
    <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/gameOne' element={<GameOne />} />
        <Route path='/addQuestions' element={<AddQuestions />} />
        <Route path='/questionContainer' element={<QuestionContainer />} />
      </Routes>
    </>
  )
}
