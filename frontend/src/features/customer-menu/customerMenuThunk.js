import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts, fetchCategories } from "../../api/menuApi";

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

export const fetchCategoriesThunk = createAsyncThunk(
  "customerMenu/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchCategories();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
