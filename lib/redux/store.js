import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/cartSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartSlice,
    },
  });
};
