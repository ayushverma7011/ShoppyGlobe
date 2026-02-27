import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: localStorage.getItem("userName") || null,
    token: localStorage.getItem("token") || null,
  },
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.name;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
  },
});

export const { setLogin, setLogout } = userSlice.actions;
export default userSlice.reducer; // 👈 This must be here for 'import userReducer' to work