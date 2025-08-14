import { createSlice } from "@reduxjs/toolkit";
import { fetchProductsThunk } from "./customerMenuThunk";

const initialState = {
  products: [],
  fetchProductsStatus: {
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
      });
  },
});

export default customerMenuSlice.reducer;
