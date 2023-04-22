import { createSlice } from '@reduxjs/toolkit';

const initialState = { cartItems: [], totalQuantity: 0, totalPrice: 0 };

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (!existingItem) {
        state.cartItems.push({ ...item, totalPrice: item.price, quantity: 1 });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += existingItem.price;
      }

      state.totalQuantity++;
      state.totalPrice += item.price;
    },

    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.id === id
      );
      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }

      state.totalQuantity--;
      state.totalPrice -= existingItem.price;
    },

    deleteItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.id === id
      );
      state.cartItems = state.cartItems.filter((item) => item.id !== id);

      state.totalQuantity -= existingItem.quantity;
      state.totalPrice -= existingItem.totalPrice;
    },
  },
});

export const cartAction = cartSlice.actions;

export default cartSlice;
