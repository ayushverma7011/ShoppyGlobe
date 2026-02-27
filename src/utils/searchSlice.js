import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    isVisible: false,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
    toggleSearchVisibility: (state) => {
      state.isVisible = !state.isVisible;
    },
    clearSearch: (state) => {
      state.query = '';
      state.isVisible = false;
    },
  },
});

export const { setSearchQuery, toggleSearchVisibility, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;