import { createSlice } from '@reduxjs/toolkit';

const itemSlice = createSlice({
  name: 'items',
  initialState: {
    allItems: [],
    preferedItems: [],
    filtedTypes: [],
    favItems: [],
    isLoading: false,
  },
  reducers: {
    replaceItem(state, action) {
      const payload = action.payload;
      state.allItems = payload;
      if (state.filtedTypes.length > 0) {
        state.preferedItems = state.allItems.filter((item) =>
          state.filtedTypes.includes(item.type)
        );
      } else {
        state.preferedItems = payload;
      }
      state.isLoading = false;
    },
    loading(state) {
      state.isLoading = true;
    },
    itemFilter(state, action) {
      const type = action.payload.type;
      state.filtedTypes = state.filtedTypes.concat(type.toLowerCase());
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
  },
});

export const itemActions = itemSlice.actions;

export default itemSlice;
