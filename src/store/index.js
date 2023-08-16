import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage: storage,
  whiteList: ["user"],
};

export const rootReducers = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

store.subscribe(() => console.log(store.getState()));
