import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMenuItems } from "../../api/menuApi";

export const fetchMenuItemsThunk = createAsyncThunk(
  "menu/fetchMenuItems",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchMenuItems();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
