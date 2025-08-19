import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addOrderProduct,
  removeOrderProduct,
  fetchActiveOrder,
  createOrder,
  updateOrderProductStatus,
  deleteOrder,
  fetchOrderProducts,
} from "../../api/orderApi";
import { fetchRestaurants, fetchTables } from "../../api/restaurantApi";

export const addOrderProductThunk = createAsyncThunk(
  "customerOrder/addOrderProduct",
  async ({ orderId, productId }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      return await addOrderProduct({ orderId, productId }, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeOrderProductThunk = createAsyncThunk(
  "customerOrder/removeOrderProduct",
  async (orderProductId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      return await removeOrderProduct(orderProductId, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchActiveOrderThunk = createAsyncThunk(
  "customerOrder/fetchActiveOrder",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      return await fetchActiveOrder(token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRestaurantsThunk = createAsyncThunk(
  "customerOrder/fetchRestaurants",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchRestaurants();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTablesThunk = createAsyncThunk(
  "customerOrder/fetchTables",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchTables();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createOrderThunk = createAsyncThunk(
  "customerOrder/createOrder",
  async (tableId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      return await createOrder(tableId, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateOrderProductStatusThunk = createAsyncThunk(
  "customerOrder/updateOrderProductStatus",
  async ({ orderProductId, status }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      return await updateOrderProductStatus({ orderProductId, status }, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteOrderThunk = createAsyncThunk(
  "customerOrder/deleteOrder",
  async (orderId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      return await deleteOrder(orderId, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOrderProductsThunk = createAsyncThunk(
  "customerOrder/fetchOrderProducts",
  async (orderId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      return await fetchOrderProducts(orderId, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
