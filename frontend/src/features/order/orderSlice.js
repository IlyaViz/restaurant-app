import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_API_URL } from "../../constants/settings.js";
import getAuthHeaders from "../auth/getAuthHeaders.js";

export const addOrderProduct = createAsyncThunk(
  "order/addOrderProduct",
  async ({ orderId, productId, quantity }, { rejectWithValue, getState }) => {
    try {
      const response = await fetch(
        `${BACKEND_API_URL}/order-management/order-product/`,
        {
          method: "POST",
          body: JSON.stringify({
            order: orderId,
            product: productId,
            quantity,
          }),
          headers: getAuthHeaders(getState),
        }
      );

      if (!response.ok) {
        const error = await response.json();

        return rejectWithValue(error);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchActiveOrder = createAsyncThunk(
  "order/fetchActiveOrder",
  async (_, { rejectWithValue, getState }) => {
    try {
      const response = await fetch(
        `${BACKEND_API_URL}/order-management/order/active-order/`,
        {
          headers: getAuthHeaders(getState),
        }
      );

      if (!response.ok) {
        const error = await response.json();

        return rejectWithValue(error);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (table, { rejectWithValue, getState }) => {
    try {
      const response = await fetch(
        `${BACKEND_API_URL}/order-management/order/`,
        {
          method: "POST",
          body: JSON.stringify({ table }),
          headers: getAuthHeaders(getState),
        }
      );

      if (!response.ok) {
        const error = await response.json();

        return rejectWithValue(error);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
      });
  },
});

export default orderSlice.reducer;
