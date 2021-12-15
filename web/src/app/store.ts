import { configureStore } from "@reduxjs/toolkit";
import user from "../features/userSlice";
import global from "../features/globalSlice";
import admin from "../features/adminSlice";
import navbar from "../features/navbarSlice";
import config from "../features/configSlice"
import student from "../features/studentSlice"

export const store = configureStore({
  reducer: {
    user,
    global,
    admin,
    navbar,
    config,
    student
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
