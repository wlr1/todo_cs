import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice/authSlice";
import userReducer from "./slices/userSlice/userSlice";
import todoReducer from "./slices/todoSlice/todoSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    todos: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
