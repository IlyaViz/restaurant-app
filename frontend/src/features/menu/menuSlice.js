import { createSlice } from "@reduxjs/toolkit";
import { fetchMenuItemsThunk } from "./menuThunk";

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
      .addCase(fetchMenuItemsThunk.pending, (state) => {
        state.fetchMenuItemsStatus.loading = true;
        state.fetchMenuItemsStatus.error = null;
      })
      .addCase(fetchMenuItemsThunk.fulfilled, (state, action) => {
        state.menuItems = action.payload;
        state.fetchMenuItemsStatus.loading = false;
      })
      .addCase(fetchMenuItemsThunk.rejected, (state, action) => {
        state.fetchMenuItemsStatus.error = action.payload;
        state.fetchMenuItemsStatus.loading = false;
      });
  },
});

export default menuSlice.reducer;
