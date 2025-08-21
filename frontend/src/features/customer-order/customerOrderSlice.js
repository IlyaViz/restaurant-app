import { createSlice } from "@reduxjs/toolkit";
import {
  fetchActiveOrderThunk,
  fetchRestaurantsThunk,
  fetchParticipantsThunk,
  fetchTablesThunk,
  fetchOrderThunk,
  updateOrderProductStatusThunk,
  updateOrderParticipantsThunk,
  deleteOrderThunk,
  createOrderThunk,
  fetchOrderProductsThunk,
  removeOrderProductThunk,
  addOrderProductThunk,
  searchPossibleParticipantsThunk,
} from "./customerOrderThunk";

const initialState = {
  order: null,
  joinedOrderId: null,
  participants: [],
  possibleParticipants: [],
  orderProducts: [],
  restaurants: [],
  tables: [],
  addOrderProductStatus: {
    loading: false,
    error: null,
  },
  fetchActiveOrderStatus: {
    loading: false,
    error: null,
  },
  fetchRestaurantsStatus: {
    loading: false,
    error: null,
  },
  fetchTablesStatus: {
    loading: false,
    error: null,
  },
  fetchOrderProductsStatus: {
    loading: false,
    error: null,
  },
  fetchParticipantsStatus: {
    loading: false,
    error: null,
  },
  fetchOrderStatus: {
    loading: false,
    error: null,
  },
  createOrderStatus: {
    loading: false,
    error: null,
  },
  removeOrderProductStatus: {
    loading: false,
    error: null,
  },
  deleteOrderStatus: {
    loading: false,
    error: null,
  },
  updateOrderProductStatus: {
    loading: false,
    error: null,
  },
  updateOrderParticipantsStatus: {
    loading: false,
    error: null,
  },
  searchPossibleParticipantsStatus: {
    loading: false,
    error: null,
  },
};

const customerOrderSlice = createSlice({
  name: "customerOrder",
  initialState,
  reducers: {
    joinOrder(state, action) {
      state.joinedOrderId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrderProductThunk.pending, (state) => {
        state.addOrderProductStatus.loading = true;
        state.addOrderProductStatus.error = null;
      })
      .addCase(addOrderProductThunk.fulfilled, (state, action) => {
        state.orderProducts.push(action.payload);
        state.addOrderProductStatus.loading = false;
      })
      .addCase(addOrderProductThunk.rejected, (state, action) => {
        state.addOrderProductStatus.loading = false;
        state.addOrderProductStatus.error = action.payload;
      })

      .addCase(fetchActiveOrderThunk.pending, (state) => {
        state.fetchActiveOrderStatus.loading = true;
        state.fetchActiveOrderStatus.error = null;
      })
      .addCase(fetchActiveOrderThunk.fulfilled, (state, action) => {
        state.order = action.payload;
        state.fetchActiveOrderStatus.loading = false;
      })
      .addCase(fetchActiveOrderThunk.rejected, (state, action) => {
        state.order = null;
        state.fetchActiveOrderStatus.loading = false;
        state.fetchActiveOrderStatus.error = action.payload;
      })

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

      .addCase(fetchParticipantsThunk.pending, (state) => {
        state.fetchParticipantsStatus.loading = true;
        state.fetchParticipantsStatus.error = null;
      })
      .addCase(fetchParticipantsThunk.fulfilled, (state, action) => {
        state.participants = action.payload;
        state.fetchParticipantsStatus.loading = false;
      })
      .addCase(fetchParticipantsThunk.rejected, (state, action) => {
        state.fetchParticipantsStatus.loading = false;
        state.fetchParticipantsStatus.error = action.payload;
      })

      .addCase(fetchOrderThunk.pending, (state) => {
        state.fetchOrderStatus.loading = true;
        state.fetchOrderStatus.error = null;
      })
      .addCase(fetchOrderThunk.fulfilled, (state, action) => {
        state.order = action.payload;
        state.fetchOrderStatus.loading = false;
      })
      .addCase(fetchOrderThunk.rejected, (state, action) => {
        state.order = null;
        state.fetchOrderStatus.loading = false;
        state.fetchOrderStatus.error = action.payload;
      })

      .addCase(createOrderThunk.pending, (state) => {
        state.createOrderStatus.loading = true;
        state.createOrderStatus.error = null;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.order = action.payload;
        state.joinedOrderId = null;
        state.createOrderStatus.loading = false;
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.createOrderStatus.loading = false;
        state.createOrderStatus.error = action.payload;
      })

      .addCase(fetchOrderProductsThunk.pending, (state) => {
        state.fetchOrderProductsStatus.loading = true;
        state.fetchOrderProductsStatus.error = null;
      })
      .addCase(fetchOrderProductsThunk.fulfilled, (state, action) => {
        state.orderProducts = action.payload;
        state.fetchOrderProductsStatus.loading = false;
      })
      .addCase(fetchOrderProductsThunk.rejected, (state, action) => {
        state.fetchOrderProductsStatus.loading = false;
        state.fetchOrderProductsStatus.error = action.payload;
      })

      .addCase(removeOrderProductThunk.pending, (state) => {
        state.removeOrderProductStatus.loading = true;
        state.removeOrderProductStatus.error = null;
      })
      .addCase(removeOrderProductThunk.fulfilled, (state, action) => {
        state.orderProducts = state.orderProducts.filter(
          (product) => product.id !== action.payload
        );
        state.removeOrderProductStatus.loading = false;
      })
      .addCase(removeOrderProductThunk.rejected, (state, action) => {
        state.removeOrderProductStatus.loading = false;
        state.removeOrderProductStatus.error = action.payload;
      })

      .addCase(deleteOrderThunk.pending, (state) => {
        state.deleteOrderStatus.loading = true;
        state.deleteOrderStatus.error = null;
      })
      .addCase(deleteOrderThunk.fulfilled, (state) => {
        state.order = null;
        state.deleteOrderStatus.loading = false;
      })
      .addCase(deleteOrderThunk.rejected, (state, action) => {
        state.deleteOrderStatus.loading = false;
        state.deleteOrderStatus.error = action.payload;
      })

      .addCase(updateOrderProductStatusThunk.pending, (state) => {
        state.updateOrderProductStatus.loading = true;
        state.updateOrderProductStatus.error = null;
      })
      .addCase(updateOrderProductStatusThunk.fulfilled, (state, action) => {
        const { id, status } = action.payload;

        const orderProduct = state.orderProducts.find(
          (orderProduct) => orderProduct.id === id
        );

        if (orderProduct) {
          orderProduct.status = status;
        }

        state.updateOrderProductStatus.loading = false;
      })
      .addCase(updateOrderProductStatusThunk.rejected, (state, action) => {
        state.updateOrderProductStatus.loading = false;
        state.updateOrderProductStatus.error = action.payload;
      })

      .addCase(updateOrderParticipantsThunk.pending, (state) => {
        state.updateOrderParticipantsStatus.loading = true;
        state.updateOrderParticipantsStatus.error = null;
      })
      .addCase(updateOrderParticipantsThunk.fulfilled, (state, action) => {
        state.order = action.payload;

        state.participants = state.participants.filter((participant) =>
          action.payload.participants.includes(participant.id)
        );

        state.updateOrderParticipantsStatus.loading = false;
      })
      .addCase(updateOrderParticipantsThunk.rejected, (state, action) => {
        state.updateOrderParticipantsStatus.loading = false;
        state.updateOrderParticipantsStatus.error = action.payload;
      })

      .addCase(searchPossibleParticipantsThunk.pending, (state) => {
        state.searchPossibleParticipantsStatus.loading = true;
        state.searchPossibleParticipantsStatus.error = null;
      })
      .addCase(searchPossibleParticipantsThunk.fulfilled, (state, action) => {
        state.possibleParticipants = action.payload.results;
        state.searchPossibleParticipantsStatus.loading = false;
        state.searchPossibleParticipantsStatus.data = action.payload;
      })
      .addCase(searchPossibleParticipantsThunk.rejected, (state, action) => {
        state.searchPossibleParticipantsStatus.loading = false;
        state.searchPossibleParticipantsStatus.error = action.payload;
      });
  },
});

export const { joinOrder } = customerOrderSlice.actions;
export default customerOrderSlice.reducer;
