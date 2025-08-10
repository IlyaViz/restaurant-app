import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCustomerActiveOrdersThunk,
  updateCustomerOrderProductStatusThunk,
  deleteCustomerOrderThunk,
  fetchCustomerOrderProductsThunk,
} from "./kitchenThunk";

const initialState = {
  customerOrders: [],
  customerOrderProducts: [],
  fetchCustomerActiveOrdersStatus: {
    loading: false,
    error: null,
  },
  fetchCustomerOrderProductsStatus: {
    loading: false,
    error: null,
  },
  updateCustomerOrderProductStatus: {
    loading: false,
    error: null,
  },
  deleteCustomerOrderStatus: {
    loading: false,
    error: null,
  },
};

const kitchenSlice = createSlice({
  name: "kitchen",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerActiveOrdersThunk.pending, (state) => {
        state.fetchCustomerActiveOrdersStatus.loading = true;
      })
      .addCase(fetchCustomerActiveOrdersThunk.fulfilled, (state, action) => {
        state.customerOrders = action.payload;
        state.fetchCustomerActiveOrdersStatus.loading = false;
      })
      .addCase(fetchCustomerActiveOrdersThunk.rejected, (state, action) => {
        state.fetchCustomerActiveOrdersStatus.loading = false;
        state.fetchCustomerActiveOrdersStatus.error = action.payload;
      })

      .addCase(fetchCustomerOrderProductsThunk.pending, (state) => {
        state.fetchCustomerOrderProductsStatus.loading = true;
      })
      .addCase(fetchCustomerOrderProductsThunk.fulfilled, (state, action) => {
        state.customerOrderProducts = action.payload;
        state.fetchCustomerOrderProductsStatus.loading = false;
      })
      .addCase(fetchCustomerOrderProductsThunk.rejected, (state, action) => {
        state.fetchCustomerOrderProductsStatus.loading = false;
        state.fetchCustomerOrderProductsStatus.error = action.payload;
      })

      .addCase(updateCustomerOrderProductStatusThunk.pending, (state) => {
        state.updateCustomerOrderProductStatus.loading = true;
      })
      .addCase(
        updateCustomerOrderProductStatusThunk.fulfilled,
        (state, action) => {
          state.updateCustomerOrderProductStatus.loading = false;
        }
      )
      .addCase(
        updateCustomerOrderProductStatusThunk.rejected,
        (state, action) => {
          state.updateCustomerOrderProductStatus.loading = false;
          state.updateCustomerOrderProductStatus.error = action.payload;
        }
      )

      .addCase(deleteCustomerOrderThunk.pending, (state) => {
        state.deleteCustomerOrderStatus.loading = true;
      })
      .addCase(deleteCustomerOrderThunk.fulfilled, (state, action) => {
        state.deleteCustomerOrderStatus.loading = false;
      })
      .addCase(deleteCustomerOrderThunk.rejected, (state, action) => {
        state.deleteCustomerOrderStatus.loading = false;
        state.deleteCustomerOrderStatus.error = action.payload;
      });
  },
});

export default kitchenSlice.reducer;
