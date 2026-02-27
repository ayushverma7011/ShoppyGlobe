import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState:{
    items: [],
    user: null,
    isSearchVisible: false,
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
    // If it exists, increment the quantity
      existingItem.quantity += 1;
    } else {
      // ✅ CRITICAL: Spread the product data AND add quantity: 1
      state.items.push({ ...action.payload, quantity: 1 });
    }
      // console.log(action.payload);
    },
    toggleSearch: (state) => {
      state.isSearchVisible = !state.isSearchVisible;
    },
    setSearchVisible: (state, action) => {
      state.isSearchVisible = action.payload;
    },
    removeItem: (state) => {
      state.items.pop()
    },
    setCartItems: (state, action) => {
      state.items = action.payload;
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
    resetSearch: (state) => {
      state.isSearchVisible = false;
    },
  },
})
export const { addItem, removeItem, updateQuantity, clearCart, toggleSearch, setSearchVisible, resetSearch, setCartItems } = cartSlice.actions

export default cartSlice.reducer