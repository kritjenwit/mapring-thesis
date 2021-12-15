import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GlobalState {
  isError: boolean;
  error: string;
}

interface PayloadGlobal {
  error: string;
}

const error =
  typeof window !== "undefined" ? localStorage.getItem("globalError") : "";

const initialState: GlobalState = error
  ? {
      isError: true,
      error: error,
    }
  : {
      isError: false,
      error: "",
    };

export const userSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setGlobalError: (state, action: PayloadAction<PayloadGlobal>) => {
      state.isError = true;
      state.error = action.payload.error;
      localStorage.setItem("globalError", action.payload.error);
    },
    unsetGlobalError: (state) => {
      state.isError = false;
      state.error = "";
      localStorage.removeItem("globalError");
    },
  },
});

export const { setGlobalError, unsetGlobalError } = userSlice.actions;

export default userSlice.reducer;
