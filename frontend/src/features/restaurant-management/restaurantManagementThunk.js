import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchRestaurants,
  fetchTables,
  updateRestaurant,
  updateTable,
  deleteRestaurant,
  deleteTable,
  createRestaurant,
  createTable,
} from "../../api/restaurantApi";

export const fetchRestaurantsThunk = createAsyncThunk(
  "restaurantManagement/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchRestaurants();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTablesThunk = createAsyncThunk(
  "restaurantManagement/fetchTables",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchTables();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateRestaurantThunk = createAsyncThunk(
  "restaurantManagement/updateRestaurant",
  async ({ restaurantId, restaurantData }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      return await updateRestaurant({ restaurantId, restaurantData }, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTableThunk = createAsyncThunk(
  "restaurantManagement/updateTable",
  async ({ tableId, tableData }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      return await updateTable({ tableId, tableData }, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteRestaurantThunk = createAsyncThunk(
  "restaurantManagement/deleteRestaurant",
  async (restaurantId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      return await deleteRestaurant(restaurantId, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTableThunk = createAsyncThunk(
  "restaurantManagement/deleteTable",
  async (tableId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      return await deleteTable(tableId, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createRestaurantThunk = createAsyncThunk(
  "restaurantManagement/createRestaurant",
  async (restaurantData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      return await createRestaurant(restaurantData, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createTableThunk = createAsyncThunk(
  "restaurantManagement/createTable",
  async (tableData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      return await createTable(tableData, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
