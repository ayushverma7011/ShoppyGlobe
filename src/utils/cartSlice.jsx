import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState:{
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload)
      // console.log(action.payload);
    },
    removeItem: (state) => {
      state.items.pop()
    },
    updateQuantity: (state, action) =>{
        const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      // Requirement: quantity should not go below 1 
      if (item && quantity >= 1) {
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items.length= 0
    },
  },
})
export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions

export default cartSlice.reducer