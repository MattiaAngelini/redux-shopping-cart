import { createSlice } from '@reduxjs/toolkit';

const itemsSlice = createSlice({
  name: 'items',
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
    removeItem: (state, action) => {
      const itemId = action.payload; // id dell'item da modificare
      const itemIndex = state.findIndex(item => item.id === itemId); // Trova l'indice dell'item nello stato

      if (itemIndex !== -1) {
        const item = state[itemIndex];

        // Decremento item.rating.count se maggiore di 0
        if (item.rating.count > 0) {
          item.rating.count -= 1;
        }
        // Se count raggiunge 0, rimuovi l'item dallo stato
        if (item.rating.count === 0) {
          state.splice(itemIndex, 1); // Rimuovi l'item dall'array usando l'indice
        }
      }
    },
    updateItem: (state) => {
      return []; // Svuota lo stato
    },
  },
});

export const { addItem, removeItem, updateItem } = itemsSlice.actions;
export default itemsSlice.reducer;