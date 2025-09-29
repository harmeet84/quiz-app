import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import HomeScreen from "../components/HomeScreen";
import { store } from '@/store'
import { describe, it, expect, test } from 'vitest';

describe("HomeScreen", () => {
    it("renders buttons for Flow A and Flow B", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <HomeScreen />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText("Start Flow A")).toBeInTheDocument();
        expect(screen.getByText("Start Flow B")).toBeInTheDocument();
    });

    it("navigates when Flow A button clicked", async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <HomeScreen />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.click(screen.getByText("Start Flow A"));
        await waitFor(() => {
            expect(store.getState().quiz.flow).toBe('A');
        });

    });


    test('renders button', () => {
        render(<button>Start Flow A</button>);
        expect(screen.getByText('Start Flow A')).toBeInTheDocument();
    });

});
