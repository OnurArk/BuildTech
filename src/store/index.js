import { configureStore } from '@reduxjs/toolkit';

import itemSlice from './item-slice';
import itemDetailSlice from './itemDetail-slice';
import cartSlice from './cart-slice';

const store = configureStore({
  reducer: {
    items: itemSlice.reducer,
    detailItem: itemDetailSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
