import "@testing-library/jest-dom";
import payload from '@/data/payload.json';
import { vi } from 'vitest';

process.env.VITE_API_URL = '/public/payload.json';

export const endpoints = {
    payload: process.env.VITE_API_URL,
};



vi.mock('@/api/client', () => ({
    getJson: vi.fn(() => Promise.resolve(payload)),
    endpoints: {
        payload: '/payload.json',
    },
}));