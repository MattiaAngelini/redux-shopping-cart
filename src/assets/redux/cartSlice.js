import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addItemCart: (state, action) => {
      state.push(action.payload);
    },

    removeItemCart: (state, action) => {
     
    },
  },
});

export const { addItemCart, removeItemCart} = cartSlice.actions;
export default cartSlice.reducer;