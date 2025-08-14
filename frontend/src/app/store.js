import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { combineReducers } from "redux";
import { persistedAuthReducer } from "./persistedReducers";
import { logout } from "../features/auth/authSlice";
import menuReducer from "../features/menu/menuSlice";
import customerOrderReducer from "../features/customer-order/customerOrderSlice";
import restaurantReducer from "../features/restaurant/restaurantSlice";
import toastReducer from "../features/toast/toastSlice";
import kitchenReducer from "../features/kitchen/kitchenSlice";

const appReducer = combineReducers({
  auth: persistedAuthReducer,
  menu: menuReducer,
  customerOrder: customerOrderReducer,
  kitchen: kitchenReducer,
  toast: toastReducer,
  restaurant: restaurantReducer,
});

const rootReducer = (state, action) => {
  if (action.type === logout.type) {
    state = {
      ...state,
      customerOrder: undefined,
    };
  }

  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
