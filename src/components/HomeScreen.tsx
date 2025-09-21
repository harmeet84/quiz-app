import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { init } from '@/store/quizSlice'
import { loadFlowA, loadFlowB } from '@/api/adapters'

export default function HomeScreen() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  async function startFlow(flow: 'A' | 'B') {
    if (flow === 'A') {
      const rounds = await loadFlowA()
      dispatch(init({ flow, rounds }))
      navigate('/quiz')
    } else {
      const rounds = await loadFlowB()
      dispatch(init({ flow, rounds }))
      navigate('/round')
    }
  }

  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <h2>Welcome to Quiz</h2>
      <p className="small">Choose a flow to begin</p>
      <div className="buttons" style={{ marginTop: 12, justifyContent: 'center' }}>
        <button className="btn btn-primary" onClick={() => startFlow('A')}>Start Flow A</button>
        <button className="btn btn-primary" onClick={() => startFlow('B')}>Start Flow B</button>
      </div>
    </div>
  )
}
