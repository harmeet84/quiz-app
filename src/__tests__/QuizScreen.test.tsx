import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import QuizScreen from "../components/QuizScreen";
import { init } from "../store/quizSlice";
import { store } from '@/store'
import { describe, it, expect, test, beforeEach } from 'vitest';

const mockRounds = [
    {
        id: "r1",
        title: "Round 1",
        questions: [
            { id: "q1", text: "Question 1?", options: [{ id: "o1", text: "True", isCorrect: true }], answer: true },
        ],
    },
];

describe("QuizScreen", () => {
    beforeEach(() => {
        store.dispatch(init({ flow: "A", rounds: mockRounds }));
    });

    it("renders a question", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <QuizScreen />
                </MemoryRouter>
            </Provider>
        );
        const els = screen.getAllByText(/Question./);
        expect(els[0]).toBeInTheDocument();
    });

    it("records an answer", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <QuizScreen />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.click(screen.getByText("True"));
        expect(store.getState().quiz.rounds[0].questions[0].userAnswer).toBe(true);
    });
});
