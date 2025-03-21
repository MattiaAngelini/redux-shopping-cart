import { configureStore } from '@reduxjs/toolkit'
import {apiSlice} from './storageSlice.js'
import itemsReducer from './itemsSlice.js';
import cartReducer from './cartSlice.js'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // Aggiungo il reducer di RTK Query
    items: itemsReducer, // Reducer tradizionale per gestione items nello store
    cart: cartReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Aggiungo il middleware di RTK Query
});

export default store;