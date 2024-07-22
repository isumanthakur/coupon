import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    themeMode: 'morning',  // Default theme
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        morningMode: (state) => {
            state.themeMode = 'morning';
        },
        nightMode: (state) => {
            state.themeMode = 'night';
        },
        noonMode: (state) => {
            state.themeMode = 'noon';
        },
        afternoonMode: (state) => {
            state.themeMode = 'afternoon';
        },
        eveningMode: (state) => {
            state.themeMode = 'evening';
        },
    },
});

export const { morningMode, nightMode, noonMode, afternoonMode, eveningMode } = themeSlice.actions;
export default themeSlice.reducer;
