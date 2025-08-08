import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { persistedAuthReducer } from "./persistedReducers";
import menuReducer from "../features/menu/menuSlice";
import orderReducer from "../features/order/orderSlice";
import restaurantReducer from "../features/restaurant/restaurantSlice";

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    menu: menuReducer,
    order: orderReducer,
    restaurant: restaurantReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
