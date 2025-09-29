import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import RoundScreen from "../components/RoundScreen";
import { init } from "../store/quizSlice";
import { store } from '@/store'
import { describe, it, expect, test, beforeEach } from 'vitest';

const mockRounds = [
    {
        id: "r1",
        title: "Round 1",
        questions: [],
    },
];

describe("RoundIntro", () => {
    beforeEach(() => {
        store.dispatch(init({ flow: "B", rounds: mockRounds }));
    });

    it("renders round title", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <RoundScreen />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText("Round 1")).toBeInTheDocument();
    });

    it("navigates when start round clicked", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <RoundScreen />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.click(screen.getByText(/Start Round/));
        expect(store.getState().quiz.currentRound).toBe(0);
    });
});
