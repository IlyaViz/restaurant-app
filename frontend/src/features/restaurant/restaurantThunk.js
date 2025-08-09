import { createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_API_URL } from "../../constants/settings";
import getAuthHeaders from "../auth/getAuthHeaders";

export const fetchRestaurants = createAsyncThunk(
  "restaurant/fetchRestaurants",
  async (_, { rejectWithValue, getState }) => {
    try {
      const response = await fetch(
        `${BACKEND_API_URL}/restaurant-management/restaurant/`,
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

export const fetchRestaurantTables = createAsyncThunk(
  "restaurant/fetchRestaurantTables",
  async (restaurantId, { rejectWithValue, getState }) => {
    try {
      const response = await fetch(
        `${BACKEND_API_URL}/restaurant-management/restaurant/${restaurantId}/tables/`,
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
