import React from 'react'
import { Home } from './pages/Home.jsx'
import { Routes, Route } from 'react-router-dom'
import { GameOne } from './games/GameOne.jsx'

export const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/gameOne' element={<GameOne />} />
      </Routes>
    </>
  )
}
