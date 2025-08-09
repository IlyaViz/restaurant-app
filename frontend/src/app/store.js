import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { combineReducers } from "redux";
import { persistedAuthReducer } from "./persistedReducers";
import menuReducer from "../features/menu/menuSlice";
import orderReducer from "../features/order/orderSlice";
import restaurantReducer from "../features/restaurant/restaurantSlice";
import toastReducer from "../features/toast/toastSlice";

const appReducer = combineReducers({
  auth: persistedAuthReducer,
  menu: menuReducer,
  order: orderReducer,
  toast: toastReducer,
  restaurant: restaurantReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = {
      ...state,
      auth: undefined,
      order: undefined,
    };
  }

  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"]
      },
    }),
});

export const persistor = persistStore(store);
