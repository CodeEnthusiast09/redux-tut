import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading state from localStorage:", err);
    return [];
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (err) {
    console.error("Error saving state to localStorage:", err);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadState(),
  reducers: {
    addToCart: (state, action) => {
      const { id, title, price, image } = action.payload;
      const existingItem = state.find((item) => item.id === id);

      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.push({ id, title, price, qty: 1, image });
      }

      saveState(state);
    },
    removeFromCart: (state, action) => {
      const cartId = action.payload;
      const newState = state.filter((item) => item.id !== cartId);
      saveState(newState);
      return newState;
    },
    incrementQty: (state, action) => {
      const cartId = action.payload;
      const cartItem = state.find((item) => item.id === cartId);
      if (cartItem) {
        cartItem.qty += 1;
        saveState(state);
      }
    },
    decrementQty: (state, action) => {
      const cartId = action.payload;
      const cartItem = state.find((item) => item.id === cartId);
      if (cartItem && cartItem.qty > 1) {
        cartItem.qty -= 1;
        saveState(state);
      }
    },
  },
});

export const { addToCart, removeFromCart, incrementQty, decrementQty } =
  cartSlice.actions;

export default cartSlice.reducer;
