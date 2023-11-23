import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./services/api";
import sprintSlice from "./sprintSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    sprint: sprintSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);
