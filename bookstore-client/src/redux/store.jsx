// store.js
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartslide"; // Nhập slice chính xác

export const store = configureStore({
  reducer: {
    cart: cartSlice, // Không cần .reducer
  },
});

export default store;
