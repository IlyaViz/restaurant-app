import { createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_API_URL } from "../../constants/settings";
import getAuthHeaders from "../auth/getAuthHeaders";

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

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (orderId, { rejectWithValue, getState }) => {
    try {
      const response = await fetch(
        `${BACKEND_API_URL}/order-management/order/${orderId}/`,
        {
          method: "DELETE",
          headers: getAuthHeaders(getState),
        }
      );

      if (!response.ok) {
        const error = await response.json();

        return rejectWithValue(error);
      }

      return orderId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOrderProducts = createAsyncThunk(
  "order/fetchOrderProducts",
  async (orderId, { rejectWithValue, getState }) => {
    try {
      const response = await fetch(
        `${BACKEND_API_URL}/order-management/order/${orderId}/order-products/`,
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

export const removeOrderProduct = createAsyncThunk(
  "order/removeOrderProduct",
  async (orderProductId, { rejectWithValue, getState }) => {
    try {
      const response = await fetch(
        `${BACKEND_API_URL}/order-management/order-product/${orderProductId}/`,
        {
          method: "DELETE",
          headers: getAuthHeaders(getState),
        }
      );

      if (!response.ok) {
        const error = await response.json();

        return rejectWithValue(error);
      }

      return orderProductId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateOrderProductStatus = createAsyncThunk(
  "order/updateOrderProductStatus",
  async ({ orderProductId, status }, { rejectWithValue, getState }) => {
    try {
      const response = await fetch(
        `${BACKEND_API_URL}/order-management/order-product/${orderProductId}/`,
        {
          method: "PATCH",
          body: JSON.stringify({ status }),
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
