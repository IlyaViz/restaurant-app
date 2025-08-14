import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProducts,
  updateProduct,
  deleteProduct,
  createProduct,
  fetchCategories,
} from "../../api/menuApi";

export const fetchProductsThunk = createAsyncThunk(
  "menuManagement/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchProducts();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProductThunk = createAsyncThunk(
  "menuManagement/updateProduct",
  async ({ productId, productFormData }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      return await updateProduct({ productId, productFormData }, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProductThunk = createAsyncThunk(
  "menuManagement/deleteProduct",
  async (productId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      return await deleteProduct(productId, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createProductThunk = createAsyncThunk(
  "menuManagement/createProduct",
  async (productFormData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      return await createProduct(productFormData, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCategoriesThunk = createAsyncThunk(
  "menuManagement/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchCategories();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
