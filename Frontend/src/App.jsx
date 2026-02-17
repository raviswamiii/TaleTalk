import React from 'react'
import { Home } from './pages/Home.jsx'
import { Routes, Route } from 'react-router-dom'

export const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}
