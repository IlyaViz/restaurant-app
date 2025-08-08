import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

const initialState = {
  restaurants: [],
  restaurantTables: [],
  fetchRestaurantsStatus: {
    loading: false,
    error: null,
  },
  fetchRestaurantTablesStatus: {
    loading: false,
    error: null,
  },
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.fetchRestaurantsStatus.loading = true;
        state.fetchRestaurantsStatus.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.restaurants = action.payload;
        state.fetchRestaurantsStatus.loading = false;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.fetchRestaurantsStatus.loading = false;
        state.fetchRestaurantsStatus.error = action.payload;
      })

      .addCase(fetchRestaurantTables.pending, (state) => {
        state.restaurantTables = [];
        state.fetchRestaurantTablesStatus.loading = true;
        state.fetchRestaurantTablesStatus.error = null;
      })
      .addCase(fetchRestaurantTables.fulfilled, (state, action) => {
        state.restaurantTables = action.payload;
        state.fetchRestaurantTablesStatus.loading = false;
      })
      .addCase(fetchRestaurantTables.rejected, (state, action) => {
        state.fetchRestaurantTablesStatus.loading = false;
        state.fetchRestaurantTablesStatus.error = action.payload;
      });
  },
});

export default restaurantSlice.reducer;
