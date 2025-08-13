import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCustomerActiveOrdersThunk,
  updateCustomerOrderProductStatusThunk,
  deleteCustomerOrderThunk,
  fetchCustomerOrderProductsThunk,
  finishCustomerOrderThunk,
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
  finishCustomerOrderStatus: {
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
        state.fetchCustomerActiveOrdersStatus.error = null;
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
        state.fetchCustomerOrderProductsStatus.error = null;
      })
      .addCase(fetchCustomerOrderProductsThunk.fulfilled, (state, action) => {
        const orderId = action.meta.arg;

        state.customerOrderProducts = state.customerOrderProducts.filter(
          (orderProduct) => orderProduct.order !== orderId
        );

        state.customerOrderProducts.push(...action.payload);

        state.fetchCustomerOrderProductsStatus.loading = false;
      })
      .addCase(fetchCustomerOrderProductsThunk.rejected, (state, action) => {
        state.fetchCustomerOrderProductsStatus.loading = false;
        state.fetchCustomerOrderProductsStatus.error = action.payload;
      })

      .addCase(updateCustomerOrderProductStatusThunk.pending, (state) => {
        state.updateCustomerOrderProductStatus.loading = true;
        state.updateCustomerOrderProductStatus.error = null;
      })
      .addCase(
        updateCustomerOrderProductStatusThunk.fulfilled,
        (state, action) => {
          const { id, status } = action.payload;

          const orderProduct = state.customerOrderProducts.find(
            (orderProduct) => orderProduct.id === id
          );

          if (orderProduct) {
            orderProduct.status = status;
          }

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
        state.deleteCustomerOrderStatus.error = null;
      })
      .addCase(deleteCustomerOrderThunk.fulfilled, (state, action) => {
        state.customerOrders = state.customerOrders.filter(
          (order) => order.id !== action.payload
        );
        state.deleteCustomerOrderStatus.loading = false;
      })
      .addCase(deleteCustomerOrderThunk.rejected, (state, action) => {
        state.deleteCustomerOrderStatus.loading = false;
        state.deleteCustomerOrderStatus.error = action.payload;
      })

      .addCase(finishCustomerOrderThunk.pending, (state) => {
        state.finishCustomerOrderStatus.loading = true;
        state.finishCustomerOrderStatus.error = null;
      })
      .addCase(finishCustomerOrderThunk.fulfilled, (state, action) => {
        state.customerOrders = state.customerOrders.filter(
          (order) => order.id !== action.payload.id
        );

        state.finishCustomerOrderStatus.loading = false;
      })
      .addCase(finishCustomerOrderThunk.rejected, (state, action) => {
        state.finishCustomerOrderStatus.loading = false;
        state.finishCustomerOrderStatus.error = action.payload;
      });
  },
});

export default kitchenSlice.reducer;
