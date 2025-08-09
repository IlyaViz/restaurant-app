import { createSlice } from "@reduxjs/toolkit";
import { fetchMenuItems } from "./menuThunk";

const initialState = {
  menuItems: [],
  fetchMenuItemsStatus: {
    loading: false,
    error: null,
  },
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuItems.pending, (state) => {
        state.fetchMenuItemsStatus.loading = true;
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.menuItems = action.payload;
        state.fetchMenuItemsStatus.loading = false;
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.fetchMenuItemsStatus.error = action.payload;
        state.fetchMenuItemsStatus.loading = false;
      });
  },
});

export default menuSlice.reducer;
