import { createSlice } from '@reduxjs/toolkit';

const itemsSlice = createSlice({
  name: 'items',
  initialState: [],
  reducers: {
    addItemOnStore: (state, action) => {
      const item = action.payload; // Item da riportare nel magazzino
      const itemIndex = state.findIndex(i => i.id === item.id); // Trova l'indice dell'item

      if (itemIndex !== -1) {
        // Se l'item è già nel magazzino, incrementa il contatore
        state[itemIndex].rating.count += 1;
        
      } else {
        // Se l'item non è nel magazzino, aggiungilo con count = 1
        state.push({ ...item, rating: { ...item.rating, count: action.payload.rating.count} });
      }
    },
    
    buyItem: (state, action) => {
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

export const { addItemOnStore, buyItem, updateItem } = itemsSlice.actions;
export default itemsSlice.reducer;