import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomeScreen from './components/HomeScreen'
import QuizScreen from './components/QuizScreen'
import RoundScreen from './components/RoundScreen'
import ScoreScreen from './components/ScoreScreen'

export default function App() {
  return (
    <div className="container">
      <div className="header card">
        <h1>Quiz</h1>
      </div>

      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/quiz" element={<QuizScreen />} />
        <Route path="/round" element={<RoundScreen />} />
        <Route path="/score" element={<ScoreScreen />} />
      </Routes>
    </div>
  )
}
