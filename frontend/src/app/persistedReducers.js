import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/auth/authSlice";

const persistConfig = {
  key: "root",
  storage,
};

export const persistedAuthReducer = persistReducer(persistConfig, authReducer);
