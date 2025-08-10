import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRestaurantsThunk,
  fetchRestaurantTablesThunk,
} from "./restaurantThunk";

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
      .addCase(fetchRestaurantsThunk.pending, (state) => {
        state.fetchRestaurantsStatus.loading = true;
        state.fetchRestaurantsStatus.error = null;
      })
      .addCase(fetchRestaurantsThunk.fulfilled, (state, action) => {
        state.restaurants = action.payload;
        state.fetchRestaurantsStatus.loading = false;
      })
      .addCase(fetchRestaurantsThunk.rejected, (state, action) => {
        state.fetchRestaurantsStatus.loading = false;
        state.fetchRestaurantsStatus.error = action.payload;
      })

      .addCase(fetchRestaurantTablesThunk.pending, (state) => {
        state.restaurantTables = [];
        state.fetchRestaurantTablesStatus.loading = true;
        state.fetchRestaurantTablesStatus.error = null;
      })
      .addCase(fetchRestaurantTablesThunk.fulfilled, (state, action) => {
        state.restaurantTables = action.payload;
        state.fetchRestaurantTablesStatus.loading = false;
      })
      .addCase(fetchRestaurantTablesThunk.rejected, (state, action) => {
        state.fetchRestaurantTablesStatus.loading = false;
        state.fetchRestaurantTablesStatus.error = action.payload;
      });
  },
});

export default restaurantSlice.reducer;
