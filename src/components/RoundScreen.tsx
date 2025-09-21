import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '@/hooks/useAppSelector'

export default function RoundScreen() {
  const navigate = useNavigate()
  const quiz = useAppSelector(s => s.quiz)
  const { currentRound, rounds } = quiz
  const round = rounds[currentRound]

  if (!round) return <div className="card">No round</div>

  function start() { navigate('/quiz') }

  return (
    <div className="card" style={{textAlign:'center'}}>
      <h2>{round.title}</h2>
      <p className="small">Get ready for this round</p>
      <div style={{marginTop:12}}>
        <button className="btn btn-primary" onClick={start}>Start Round</button>
      </div>
    </div>
  )
}
