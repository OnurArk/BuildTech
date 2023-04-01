import { createSlice } from '@reduxjs/toolkit';

const itemDetailSlice = createSlice({
  name: 'detailedItem',
  initialState: { items: [] },
  reducers: {
    replaceItem(state, action) {
      state.items = action.payload;
    },
  },
});

export const detailAction = itemDetailSlice.actions;

export default itemDetailSlice;
