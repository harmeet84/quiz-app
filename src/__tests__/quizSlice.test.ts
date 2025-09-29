import reducer, { init, answer, reset } from "../store/quizSlice";
import { store } from '@/store'
import { describe, it, expect, test, beforeEach } from 'vitest';

describe("quizSlice", () => {
  const initialState = {
    flow: null,
    rounds: [],
    currentRound: 0,
    currentQuestion: 0,
    finished: false,
  };

  it("initializes state", () => {
    const rounds = [{ id: "r1", title: "Round 1", questions: [] }];
    const state = reducer(initialState, init({ flow: "A", rounds }));
    expect(state.flow).toBe("A");
    expect(state.rounds.length).toBe(1);
  });

  it("records an answer and moves to next", () => {
    const rounds = [
      { id: "r1", title: "Round 1", questions: [{ id: "q1", text: "Q", options: [], answer: true }] },
    ];
    let state = reducer(initialState, init({ flow: "A", rounds }));
    state = reducer(state, answer({ roundIndex: 0, questionIndex: 0, userAnswer: true }));
    expect(state.rounds[0].questions[0].userAnswer).toBe(true);
    expect(state.finished).toBe(true);
  });

  it("resets state", () => {
    const state = reducer(initialState, reset());
    expect(state.flow).toBe(null);
  });
});
