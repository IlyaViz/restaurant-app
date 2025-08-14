import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProductsThunk,
  updateProductThunk,
  deleteProductThunk,
  createProductThunk,
  fetchCategoriesThunk,
} from "./menuManagementThunk";

const initialState = {
  products: [],
  categories: [],
  fetchProductsStatus: {
    loading: false,
    error: null,
  },
  updateProductStatus: {
    loading: false,
    error: null,
  },
  deleteProductStatus: {
    loading: false,
    error: null,
  },
  createProductStatus: {
    loading: false,
    error: null,
  },
  fetchCategoriesStatus: {
    loading: false,
    error: null,
  },
};

const menuManagementSlice = createSlice({
  name: "menuManagement",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsThunk.pending, (state) => {
        state.fetchProductsStatus.loading = true;
        state.fetchProductsStatus.error = null;
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.fetchProductsStatus.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.fetchProductsStatus.loading = false;
        state.fetchProductsStatus.error = action.payload;
      })

      .addCase(updateProductThunk.pending, (state) => {
        state.updateProductStatus.loading = true;
        state.updateProductStatus.error = null;
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );

        if (index !== -1) {
          state.products[index] = action.payload;
        }

        state.updateProductStatus.loading = false;
      })
      .addCase(updateProductThunk.rejected, (state, action) => {
        state.updateProductStatus.loading = false;
        state.updateProductStatus.error = action.payload;
      })

      .addCase(deleteProductThunk.pending, (state) => {
        state.deleteProductStatus.loading = true;
        state.deleteProductStatus.error = null;
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );

        state.deleteProductStatus.loading = false;
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        state.deleteProductStatus.loading = false;
        state.deleteProductStatus.error = action.payload;
      })

      .addCase(createProductThunk.pending, (state) => {
        state.createProductStatus.loading = true;
        state.createProductStatus.error = null;
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.products.push(action.payload);

        state.createProductStatus.loading = false;
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        state.createProductStatus.loading = false;
        state.createProductStatus.error = action.payload;
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
        state.fetchCategoriesStatus.loading = false;
        state.fetchCategoriesStatus.error = action.payload;
      });
  },
});

export default menuManagementSlice.reducer;
