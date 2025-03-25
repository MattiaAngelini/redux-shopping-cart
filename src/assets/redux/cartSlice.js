import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addItemCart: (state, action) => {
      state.push(action.payload);
    },

    removeItemCart: (state, action) => {
      // Trova l'indice dell'elemento da rimuovere
      const index = state.findIndex(item => item.title === action.payload.title);
        state.splice(index, 1); // Rimuove l'elemento alla posizione trovata
    },
  },
});

export const { addItemCart, removeItemCart} = cartSlice.actions;
export default cartSlice.reducer;