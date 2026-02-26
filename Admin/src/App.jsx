import React from 'react'
import { QuestionContainer } from './components/QuestionContainer'
import { Route, Routes } from 'react-router-dom'

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<QuestionContainer />} />
      </Routes>
    </div>
  )
}
