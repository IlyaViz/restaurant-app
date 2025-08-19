import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { combineReducers } from "redux";
import { persistedAuthReducer } from "./persistedReducers";
import { logout } from "../features/auth/authSlice";
import customerMenuReducer from "../features/customer-menu/customerMenuSlice";
import customerOrderReducer from "../features/customer-order/customerOrderSlice";
import toastReducer from "../features/toast/toastSlice";
import kitchenReducer from "../features/kitchen/kitchenSlice";
import menuManagementReducer from "../features/menu-management/menuManagementSlice";
import userManagementReducer from "../features/user-management/userManagementSlice";
import restaurantManagementReducer from "../features/restaurant-management/restaurantManagementSlice";

const appReducer = combineReducers({
  auth: persistedAuthReducer,
  customerMenu: customerMenuReducer,
  customerOrder: customerOrderReducer,
  kitchen: kitchenReducer,
  toast: toastReducer,
  menuManagement: menuManagementReducer,
  userManagement: userManagementReducer,
  restaurantManagement: restaurantManagementReducer,
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
