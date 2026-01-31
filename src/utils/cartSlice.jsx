import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState:{
    items: [],
    isSearchVisible: false,
    theme: 'light',
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
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
})
export const { addItem, removeItem, updateQuantity, clearCart, toggleSearch, setSearchVisible, resetSearch, toggleTheme } = cartSlice.actions

export default cartSlice.reducer