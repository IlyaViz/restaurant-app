import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchOrderProducts,
  fetchActiveOrder,
  addOrderProduct,
  removeOrderProduct,
  createOrder,
  updateOrderProductStatus,
  updateOrderParticipants,
  deleteOrder,
  fetchOrder,
} from "../../api/orderApi";
import {
  searchUserByPartialUsername,
  fetchParticipants,
} from "../../api/userApi";
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

export const fetchOrderThunk = createAsyncThunk(
  "customerOrder/fetchOrder",
  async (orderId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      return await fetchOrder(orderId, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchParticipantsThunk = createAsyncThunk(
  "customerOrder/fetchParticipants",
  async (orderId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      return await fetchParticipants(orderId, token);
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

export const updateOrderParticipantsThunk = createAsyncThunk(
  "customerOrder/updateOrderParticipants",
  async ({ orderId, participantIds }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      return await updateOrderParticipants({ orderId, participantIds }, token);
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

export const searchPossibleParticipantsThunk = createAsyncThunk(
  "customerOrder/searchPossibleParticipants",
  async ({ role, partialUsername }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      return await searchUserByPartialUsername(
        { role, partialUsername },
        token
      );
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
