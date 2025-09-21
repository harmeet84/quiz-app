import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { reset } from '@/store/quizSlice'

export default function ScoreScreen() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const quiz = useAppSelector(s => s.quiz)
  const { flow, rounds } = quiz

  if (!rounds || rounds.length === 0) return null

  function onHome() {
    dispatch(reset())
    navigate('/')
  }

  if (flow === 'A') {
    const total = rounds[0].questions.length
    const correct = rounds[0].questions.filter(q => q.userAnswer === q.answer).length
    return (
      <div className="card">
        <h2>Final Score</h2>


        <hr style={{ margin: '12px 0' }} />
        <div>
          {rounds[0].questions.map(q => (
            <div key={q.id} style={{ marginBottom: 10 }}>
              <div dangerouslySetInnerHTML={{ __html: q.text }} />
              <div className="small">Your answer: {String(q.userAnswer)}
                {String(q.answer) === String(q.userAnswer) ? (
                  <span style={{ color: 'green' }}>✔️</span>
                ) : (
                  <span style={{ color: 'red' }}>❌</span>
                )}
              </div>
              {/*<div className="small">Correct answer: {String(q.answer)}</div> */}
              {/*<div className="small">Feedback: {q.feedback}</div> */}
            </div>
          ))}
        </div>
        <hr style={{ margin: '12px 0' }} />
        <p style={{ fontWeight: 900 }}>You scored: <strong>{correct}</strong> / {total}</p>
        <div style={{ marginTop: 12 }}>
          <button className="btn" onClick={onHome}>Back to Home</button>
        </div>
      </div>
    )
  }

  let totalCorrect = 0, totalQ = 0
  return (
    <div className="card">
      <h2>Round Scores</h2>

      <div style={{ marginTop: 8 }}>
        {rounds.map((r, idx) => {
          const c = r.questions.filter(q => q.userAnswer === q.answer).length
          totalCorrect += c; totalQ += r.questions.length
          return (
            <div key={r.id} style={{ marginBottom: 12 }}>
              <h3>{r.title}</h3>
              <div className="small">Score: <strong>{c}</strong> / {r.questions.length}</div>
              <div style={{ marginTop: 8 }}>
                {r.questions.map(q => (
                  <div key={q.id} style={{ marginBottom: 8 }}>
                    <div dangerouslySetInnerHTML={{ __html: q.text }} />
                    <div className="small">Your Answer: {String(q.userAnswer)}
                      {String(q.answer) === String(q.userAnswer) ? (
                        <span style={{ color: 'green' }}>✔️</span>
                      ) : (
                        <span style={{ color: 'red' }}>❌</span>
                      )}
                    </div>
                    {/*  <div className="small">Your Answer: {String(q.userAnswer)} — Correct: {String(q.answer)}</div>
                    <div className="small">Feedback: {q.feedback}</div> */}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <hr style={{ margin: '12px 0' }} />
      <div style={{ fontWeight: 900 }}>You scored: {totalCorrect} / {totalQ}</div>
      <div style={{ marginTop: 12 }}><button className="btn" onClick={onHome}>Back to Home</button></div>
    </div>
  )
}
