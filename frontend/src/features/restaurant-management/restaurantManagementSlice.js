import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRestaurantsThunk,
  fetchTablesThunk,
  updateRestaurantThunk,
  updateTableThunk,
  deleteRestaurantThunk,
  deleteTableThunk,
  createRestaurantThunk,
  createTableThunk,
} from "./restaurantManagementThunk";

const initialState = {
  restaurants: [],
  tables: [],
  fetchRestaurantsStatus: { loading: false, error: null },
  fetchTablesStatus: { loading: false, error: null },
  updateRestaurantStatus: { loading: false, error: null },
  updateTableStatus: { loading: false, error: null },
  deleteRestaurantStatus: { loading: false, error: null },
  deleteTableStatus: { loading: false, error: null },
  createRestaurantStatus: { loading: false, error: null },
  createTableStatus: { loading: false, error: null },
};

const restaurantManagementSlice = createSlice({
  name: "restaurantManagement",
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

      .addCase(fetchTablesThunk.pending, (state) => {
        state.fetchTablesStatus.loading = true;
        state.fetchTablesStatus.error = null;
      })
      .addCase(fetchTablesThunk.fulfilled, (state, action) => {
        state.tables = action.payload;
        state.fetchTablesStatus.loading = false;
      })
      .addCase(fetchTablesThunk.rejected, (state, action) => {
        state.fetchTablesStatus.loading = false;
        state.fetchTablesStatus.error = action.payload;
      })

      .addCase(updateRestaurantThunk.pending, (state) => {
        state.updateRestaurantStatus.loading = true;
        state.updateRestaurantStatus.error = null;
      })
      .addCase(updateRestaurantThunk.fulfilled, (state, action) => {
        const index = state.restaurants.findIndex(
          (restaurant) => restaurant.id === action.payload.id
        );

        if (index !== -1) {
          state.restaurants[index] = action.payload;
        }

        state.updateRestaurantStatus.loading = false;
      })
      .addCase(updateRestaurantThunk.rejected, (state, action) => {
        state.updateRestaurantStatus.loading = false;
        state.updateRestaurantStatus.error = action.payload;
      })

      .addCase(updateTableThunk.pending, (state) => {
        state.updateTableStatus.loading = true;
        state.updateTableStatus.error = null;
      })
      .addCase(updateTableThunk.fulfilled, (state, action) => {
        const index = state.tables.findIndex(
          (table) => table.id === action.payload.id
        );

        if (index !== -1) {
          state.tables[index] = action.payload;
        }

        state.updateTableStatus.loading = false;
      })
      .addCase(updateTableThunk.rejected, (state, action) => {
        state.updateTableStatus.loading = false;
        state.updateTableStatus.error = action.payload;
      })

      .addCase(deleteRestaurantThunk.pending, (state) => {
        state.deleteRestaurantStatus.loading = true;
        state.deleteRestaurantStatus.error = null;
      })
      .addCase(deleteRestaurantThunk.fulfilled, (state, action) => {
        state.restaurants = state.restaurants.filter(
          (restaurant) => restaurant.id !== action.payload
        );
        state.deleteRestaurantStatus.loading = false;
      })
      .addCase(deleteRestaurantThunk.rejected, (state, action) => {
        state.deleteRestaurantStatus.loading = false;
        state.deleteRestaurantStatus.error = action.payload;
      })

      .addCase(deleteTableThunk.pending, (state) => {
        state.deleteTableStatus.loading = true;
        state.deleteTableStatus.error = null;
      })
      .addCase(deleteTableThunk.fulfilled, (state, action) => {
        state.tables = state.tables.filter(
          (table) => table.id !== action.payload
        );
        state.deleteTableStatus.loading = false;
      })
      .addCase(deleteTableThunk.rejected, (state, action) => {
        state.deleteTableStatus.loading = false;
        state.deleteTableStatus.error = action.payload;
      })

      .addCase(createRestaurantThunk.pending, (state) => {
        state.createRestaurantStatus.loading = true;
        state.createRestaurantStatus.error = null;
      })
      .addCase(createRestaurantThunk.fulfilled, (state, action) => {
        state.restaurants.push(action.payload);
        state.createRestaurantStatus.loading = false;
      })
      .addCase(createRestaurantThunk.rejected, (state, action) => {
        state.createRestaurantStatus.loading = false;
        state.createRestaurantStatus.error = action.payload;
      })

      .addCase(createTableThunk.pending, (state) => {
        state.createTableStatus.loading = true;
        state.createTableStatus.error = null;
      })
      .addCase(createTableThunk.fulfilled, (state, action) => {
        state.tables.push(action.payload);
        state.createTableStatus.loading = false;
      })
      .addCase(createTableThunk.rejected, (state, action) => {
        state.createTableStatus.loading = false;
        state.createTableStatus.error = action.payload;
      });
  },
});

export default restaurantManagementSlice.reducer;
