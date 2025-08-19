import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProducts,
  fetchCategories,
  updateProduct,
  updateCategory,
  deleteProduct,
  deleteCategory,
  createProduct,
  createCategory,
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

export const updateCategoryThunk = createAsyncThunk(
  "menuManagement/updateCategory",
  async ({ categoryId, categoryData }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      return await updateCategory({ categoryId, categoryData }, token);
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

export const deleteCategoryThunk = createAsyncThunk(
  "menuManagement/deleteCategory",
  async (categoryId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      return await deleteCategory(categoryId, token);
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

export const createCategoryThunk = createAsyncThunk(
  "menuManagement/createCategory",
  async (categoryData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      return await createCategory(categoryData, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
