import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import ScoreScreen from "../components/ScoreScreen";
import { init } from "../store/quizSlice";
import { store } from '@/store'
import { describe, it, expect, test, beforeEach } from 'vitest';

const mockRounds = [
    {
        id: "r1",
        title: "Round 1",
        questions: [
            { id: "q1", text: "Question 1?", options: [], answer: true, userAnswer: true },
            { id: "q2", text: "Question 2?", options: [], answer: false, userAnswer: true },
        ],
    },
];

describe("ScoreScreen", () => {
    beforeEach(() => {
        store.dispatch(init({ flow: "A", rounds: mockRounds }));
    });

    it("shows score summary", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ScoreScreen />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(/You scored:/)).toBeInTheDocument();
    });
});
