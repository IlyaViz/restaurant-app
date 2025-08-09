import { createSlice } from "@reduxjs/toolkit";
import {
  addOrderProduct,
  fetchActiveOrder,
  createOrder,
  fetchOrderProducts,
  removeOrderProduct,
  deleteOrder,
  updateOrderProductStatus,
} from "./orderThunk";

const initialState = {
  customerOrder: null,
  customerOrderProducts: [],
  kitchenOrders: [],
  allOrders: [],
  addOrderProductStatus: {
    loading: false,
    error: null,
  },
  fetchActiveOrderStatus: {
    loading: false,
    error: null,
  },
  createOrderStatus: {
    loading: false,
    error: null,
  },
  fetchOrderProductsStatus: {
    loading: false,
    error: null,
  },
  removeOrderProductStatus: {
    loading: false,
    error: null,
  },
  deleteOrderStatus: {
    loading: false,
    error: null,
  },
  updateOrderProductStatus: {
    loading: false,
    error: null,
  },
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addOrderProduct.pending, (state) => {
        state.addOrderProductStatus.loading = true;
        state.addOrderProductStatus.error = null;
      })
      .addCase(addOrderProduct.fulfilled, (state, action) => {
        state.customerOrderProducts.push(action.payload);
        state.addOrderProductStatus.loading = false;
      })
      .addCase(addOrderProduct.rejected, (state, action) => {
        state.addOrderProductStatus.loading = false;
        state.addOrderProductStatus.error = action.payload;
      })

      .addCase(fetchActiveOrder.pending, (state) => {
        state.fetchActiveOrderStatus.loading = true;
        state.fetchActiveOrderStatus.error = null;
      })
      .addCase(fetchActiveOrder.fulfilled, (state, action) => {
        state.customerOrder = action.payload;
        state.fetchActiveOrderStatus.loading = false;
      })
      .addCase(fetchActiveOrder.rejected, (state, action) => {
        state.fetchActiveOrderStatus.loading = false;
        state.fetchActiveOrderStatus.error = action.payload;
      })

      .addCase(createOrder.pending, (state) => {
        state.createOrderStatus.loading = true;
        state.createOrderStatus.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.customerOrder = action.payload;
        state.createOrderStatus.loading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.createOrderStatus.loading = false;
        state.createOrderStatus.error = action.payload;
      })

      .addCase(fetchOrderProducts.pending, (state) => {
        state.fetchOrderProductsStatus.loading = true;
        state.fetchOrderProductsStatus.error = null;
      })
      .addCase(fetchOrderProducts.fulfilled, (state, action) => {
        state.customerOrderProducts = action.payload;
        state.fetchOrderProductsStatus.loading = false;
      })
      .addCase(fetchOrderProducts.rejected, (state, action) => {
        state.fetchOrderProductsStatus.loading = false;
        state.fetchOrderProductsStatus.error = action.payload;
      })

      .addCase(removeOrderProduct.pending, (state) => {
        state.removeOrderProductStatus.loading = true;
        state.removeOrderProductStatus.error = null;
      })
      .addCase(removeOrderProduct.fulfilled, (state, action) => {
        state.customerOrderProducts = state.customerOrderProducts.filter(
          (product) => product.id !== action.payload
        );
        state.removeOrderProductStatus.loading = false;
      })
      .addCase(removeOrderProduct.rejected, (state, action) => {
        state.removeOrderProductStatus.loading = false;
        state.removeOrderProductStatus.error = action.payload;
      })

      .addCase(deleteOrder.pending, (state) => {
        state.deleteOrderStatus.loading = true;
        state.deleteOrderStatus.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.customerOrder = null;
        state.deleteOrderStatus.loading = false;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.deleteOrderStatus.loading = false;
        state.deleteOrderStatus.error = action.payload;
      })

      .addCase(updateOrderProductStatus.pending, (state) => {
        state.updateOrderProductStatus.loading = true;
        state.updateOrderProductStatus.error = null;
      })
      .addCase(updateOrderProductStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload;

        const orderProduct = state.customerOrderProducts.find(
          (orderProduct) => orderProduct.id === id
        );

        orderProduct.status = status;

        state.updateOrderProductStatus.loading = false;
      })
      .addCase(updateOrderProductStatus.rejected, (state, action) => {
        state.updateOrderProductStatus.loading = false;
        state.updateOrderProductStatus.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
