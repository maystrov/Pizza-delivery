import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem.count > 0) {
        findItem.count--;
      } else {
        return;
      }
    },

    deleteItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },

    calculateTotal(state) {
      state.totalPrice = state.items.reduce((acc, obj) => {
        return acc + obj.price * obj.count;
      }, 0);
    },
  },
});

export const selectCart = (store) => store.cart;
export const selectCartItemById = (id) => (store) => store.cart.items?.find((obj) => obj.id === id);

export const { addItem, deleteItem, clearCart, minusItem, calculateTotal } = cartSlice.actions;
export default cartSlice.reducer;
