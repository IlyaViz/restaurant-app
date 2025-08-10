import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchActiveOrders,
  deleteOrder,
  updateOrderProductStatus,
  fetchOrderProducts
} from "../../api/orderApi";

export const fetchCustomerActiveOrdersThunk = createAsyncThunk(
  "kitchen/fetchCustomerActiveOrders",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      return await fetchActiveOrders(token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCustomerOrderThunk = createAsyncThunk(
  "kitchen/deleteCustomerOrder",
  async (orderId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      return await deleteOrder(orderId, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCustomerOrderProductStatusThunk = createAsyncThunk(
  "kitchen/updateCustomerOrderProductStatus",
  async (orderData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      return await updateOrderProductStatus(orderData, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCustomerOrderProductsThunk = createAsyncThunk(
  "kitchen/fetchCustomerOrderProducts",
  async (orderId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      return await fetchOrderProducts(orderId, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
