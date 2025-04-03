import { configureStore } from "@reduxjs/toolkit";
import ApiSlice from "./apiSlice";
import userReducer from "../feature/user/userSlice";
export const store = configureStore({
  reducer: {
    [ApiSlice.reducerPath]: ApiSlice.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ApiSlice.middleware),
});
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
