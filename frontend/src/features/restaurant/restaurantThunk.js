import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchRestaurants,
  fetchRestaurantTables,
} from "../../api/restaurantApi";

export const fetchRestaurantsThunk = createAsyncThunk(
  "restaurant/fetchRestaurants",
  async () => {
    try {
      return await fetchRestaurants();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRestaurantTablesThunk = createAsyncThunk(
  "restaurant/fetchRestaurantTables",
  async (restaurantId) => {
    try {
      return await fetchRestaurantTables(restaurantId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
