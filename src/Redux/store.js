import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import filterSlice from "./Slices/filterSlice";
import leftPanelSlice from "./Slices/leftPanelSlice";
import nodeSlice from "./Slices/nodeSlice";
import projectsSlice from "./Slices/projectsSlice";
import edgeSlice from "./Slices/edgeSlice";
import tabSlice from "./Slices/tabSlice";
import projectSlice from "./Slices/projectSlice.js";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const rootReducer = combineReducers({
  auth: authReducer,
  filter: filterSlice,
  leftPanel: leftPanelSlice,
  node: nodeSlice,
  edge: edgeSlice,
  projects: projectsSlice,
  project: projectSlice,
  tab: tabSlice,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
