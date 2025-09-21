import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '@/hooks/useAppSelector'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { answer } from '@/store/quizSlice'

export default function QuizScreen() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const quiz = useAppSelector(s => s.quiz)
  const { currentRound, currentQuestion, rounds, finished, flow } = quiz

  useEffect(() => {
    if (finished) navigate('/score')
  }, [finished, navigate])

  if (!rounds || rounds.length === 0) return <div className="card">No questions loaded.</div>

  const round = rounds[currentRound]
  const q = round.questions[currentQuestion]

  if (!q) return <div className="card">Round finished.</div>

  function handle(choice:boolean) {
    dispatch(answer({ roundIndex: currentRound, questionIndex: currentQuestion, userAnswer: choice }))
    // If flow B and finishing a round (but not last round) we want to go to interstitial
    const isLastQuestion = currentQuestion >= round.questions.length - 1
    const isLastRound = currentRound >= rounds.length - 1
    if (isLastQuestion && flow === 'B' && !isLastRound) {
      // navigate to round interstitial after a tiny delay to let state update
      setTimeout(() => navigate('/round'), 50)
    }
  }

  return (
    <div className="card">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div>Flow {flow === 'A' ? 'A' : 'B'} — {round.title}</div>
        <div className="small">Question {currentQuestion+1} / {round.questions.length}</div>
      </div>

      <h3 style={{marginTop:12}} dangerouslySetInnerHTML={{__html: q.text}} />

      <div style={{marginTop:12, display:'flex', gap:12}}>
        <button className="btn btn-primary" onClick={() => handle(true)}>True</button>
        <button className="btn" onClick={() => handle(false)}>False</button>
      </div>
    </div>
  )
}
