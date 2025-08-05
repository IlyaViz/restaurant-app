import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { persistedAuthReducer } from "./persistedReducers";

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
