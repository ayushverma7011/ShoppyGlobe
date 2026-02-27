import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice"; // 👈 Add this line!

const store = configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer, // Now this will work
    },
});

export default store;