import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addItemCart: (state, action) => {
      state.push(action.payload);
    },

    removeItemCart: (state, action) => {
     state.pop(action.payload)
    },
  },
});

export const { addItemCart, removeItemCart} = cartSlice.actions;
export default cartSlice.reducer;