import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
  name: "items",
  initialState: {
    allItems: [],
    preferedItems: [],
    filtedTypes: [],
    favItems: [],
  },
  reducers: {
    replaceItem(state, action) {
      const payload = action.payload;
      state.allItems = payload;
      state.preferedItems = payload;
    },
    itemFilter(state, action) {
      const payload = action.payload;
      state.filtedTypes = state.filtedTypes.concat(payload.type.toLowerCase());
      if (state.filtedTypes.length <= 0) {
        state.preferedItems = state.allItems;
      } else {
        state.preferedItems = state.allItems.filter((item) =>
          state.filtedTypes.includes(item.type)
        );
      }
    },
    removeFilter(state, action) {
      const payload = action.payload;
      state.filtedTypes = state.filtedTypes.filter(
        (type) => type !== payload.type.toLowerCase()
      );
      if (state.filtedTypes.length <= 0) {
        state.preferedItems = state.allItems;
      } else {
        state.preferedItems = state.allItems.filter((item) =>
          state.filtedTypes.includes(item.type)
        );
      }
    },
    priceFilter(state, action) {
      const price = action.payload;
      if (state.filtedTypes.length <= 0) {
        state.preferedItems = state.allItems.filter(
          (item) => item.price < price
        );
      } else {
        state.preferedItems = state.allItems.filter(
          (item) => state.filtedTypes.includes(item.type) && item.price < price
        );
      }
    },
    toggleFavs(state, action) {
      const payload = action.payload;
      if (payload.id) {
        state.favItems = state.favItems.concat(
          state.allItems.filter((item) => item.id === payload.id)
        );
      }
    },
  },
});

export const itemActions = itemSlice.actions;

export default itemSlice;
