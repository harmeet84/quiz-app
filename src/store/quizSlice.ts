import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Round, FlowType } from '@/types'

type QuizState = {
  flow: FlowType|null
  rounds: Round[]
  currentRound: number
  currentQuestion: number
  finished: boolean
  loading: boolean
  error?: string|null
}

const initialState: QuizState = {
  flow: null,
  rounds: [],
  currentRound: 0,
  currentQuestion: 0,
  finished: false,
  loading: false,
  error: null
}

const slice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    init(state, action: PayloadAction<{ flow: FlowType, rounds: Round[] }>) {
      state.flow = action.payload.flow
      state.rounds = action.payload.rounds
      state.currentRound = 0
      state.currentQuestion = 0
      state.finished = false
      state.error = null
    },
    setLoading(state, action: PayloadAction<boolean>) { state.loading = action.payload },
    setError(state, action: PayloadAction<string|null>) { state.error = action.payload },
    answer(state, action: PayloadAction<{ roundIndex:number, questionIndex:number, userAnswer:boolean }>) {
      const { roundIndex, questionIndex, userAnswer } = action.payload
      const round = state.rounds[roundIndex]
      if (!round) return
      const q = round.questions[questionIndex]
      if (!q) return
      q.userAnswer = userAnswer

      const isLastQuestionInRound = questionIndex >= round.questions.length - 1
      const isLastRound = roundIndex >= state.rounds.length - 1

      if (!isLastQuestionInRound) {
        state.currentQuestion += 1
      } else if (state.flow === 'B' && !isLastRound) {
        state.currentRound += 1
        state.currentQuestion = 0
      } else {
        state.finished = true
      }
    },
    reset(state) {
      state.flow = null
      state.rounds = []
      state.currentRound = 0
      state.currentQuestion = 0
      state.finished = false
      state.loading = false
      state.error = null
    }
  }
})

export const { init, setLoading, setError, answer, reset } = slice.actions
export default slice.reducer
