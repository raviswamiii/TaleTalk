import React from 'react'
import { Home } from './pages/Home.jsx'
import { Routes, Route } from 'react-router-dom'
import { GameOne } from './games/GameOne.jsx'
import { AddQuestions } from './components/AddQuestions.jsx'

export const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/gameOne' element={<GameOne />} />
        <Route path='/addQuestions' element={<AddQuestions />} />
      </Routes>
    </>
  )
}
