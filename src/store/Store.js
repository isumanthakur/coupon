import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import themeReducer from './themeSlice';

const store = configureStore({
    reducer: {
        auth : authSlice,
        theme : themeReducer,
        //TODO: add more slices here for posts
    }
});


export default store;