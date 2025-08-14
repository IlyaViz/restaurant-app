import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "../../api/menuApi";

export const fetchProductsThunk = createAsyncThunk(
  "customerMenu/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchProducts();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
