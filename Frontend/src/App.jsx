import React from 'react'
import { Home } from './pages/Home.jsx'
import { Routes, Route } from 'react-router-dom'
import { GameOne } from './games/GameOne.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { JustMetAPerson } from './components/JustMetAPerson.jsx';
import { Jokes } from './components/Jokes.jsx';
import { Flirting } from './components/Flirting.jsx';
import { Poetries } from './components/Poetries.jsx';
import { Roasting } from './components/Roasting.jsx';
import { PickupLines } from './components/PickupLines.jsx';

export const App = () => {
  return (
    <>
    <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/gameOne' element={<GameOne />} />
        <Route path='/justmetaperson' element={<JustMetAPerson />} />
        <Route path='/jokes' element={<Jokes />} />
        <Route path='/flirting' element={<Flirting />} />
        <Route path='/poetries' element={<Poetries />} />
        <Route path='/roasting' element={<Roasting />} />
        <Route path='/pickup-lines' element={<PickupLines />} />
      </Routes>
    </>
  )
}
