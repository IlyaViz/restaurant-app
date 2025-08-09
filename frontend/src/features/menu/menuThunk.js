import { createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_API_URL } from "../../constants/settings";
import { HEADERS } from "../../constants/fetch";

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
