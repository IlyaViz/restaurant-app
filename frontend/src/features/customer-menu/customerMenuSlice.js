import { createSlice } from "@reduxjs/toolkit";
import { fetchProductsThunk, fetchCategoriesThunk } from "./customerMenuThunk";

const initialState = {
  products: [],
  categories: [],
  fetchProductsStatus: {
    loading: false,
    error: null,
  },
  fetchCategoriesStatus: {
    loading: false,
    error: null,
  },
};

const customerMenuSlice = createSlice({
  name: "customerMenu",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsThunk.pending, (state) => {
        state.fetchProductsStatus.loading = true;
        state.fetchProductsStatus.error = null;
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.products = action.payload;
        state.fetchProductsStatus.loading = false;
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.fetchProductsStatus.error = action.payload;
        state.fetchProductsStatus.loading = false;
      })

      .addCase(fetchCategoriesThunk.pending, (state) => {
        state.fetchCategoriesStatus.loading = true;
        state.fetchCategoriesStatus.error = null;
      })
      .addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.fetchCategoriesStatus.loading = false;
      })
      .addCase(fetchCategoriesThunk.rejected, (state, action) => {
        state.fetchCategoriesStatus.error = action.payload;
        state.fetchCategoriesStatus.loading = false;
      });
  },
});

export default customerMenuSlice.reducer;
