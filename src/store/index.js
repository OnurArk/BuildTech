import { configureStore } from "@reduxjs/toolkit";

import itemSlice from "./item-slice";
import itemDetailSlice from "./itemDetail-slice";

const store = configureStore({
  reducer: {
    items: itemSlice.reducer,
    detailItem: itemDetailSlice.reducer,
  },
});

export default store;
