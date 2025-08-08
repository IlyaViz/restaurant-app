import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_API_URL } from "../../constants/settings.js";
import { HEADERS } from "../../constants/fetch.js";

export const fetchMenuItems = createAsyncThunk(
  "menu/fetchMenuItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BACKEND_API_URL}/menu-management/product/`,
        {
          headers: HEADERS,
        }
      );

      if (!response.ok) {
        error = await response.json();

        return rejectWithValue(error);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
