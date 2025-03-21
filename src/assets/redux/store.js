import { configureStore } from '@reduxjs/toolkit'
import {apiSlice} from './storageSlice.js'
import itemsReducer from './itemsSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // Aggiungo il reducer di RTK Query
    items: itemsReducer, // Reducer tradizionale per gestione items nello store
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Aggiungo il middleware di RTK Query
});

export default store;