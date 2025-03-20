import { configureStore } from '@reduxjs/toolkit'
import {apiSlice} from './storageSlice.js'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // Aggiungiamo il reducer di RTK Query
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Aggiungiamo il middleware di RTK Query
});

export default store;