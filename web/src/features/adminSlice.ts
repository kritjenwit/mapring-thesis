import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AdminState {
  registration: any[];
}

interface PayloadRegistration {
  registration: any[];
}

const initialState: AdminState = {
  registration: [],
};

export const adminSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setRegistration: (state, action: PayloadAction<PayloadRegistration>) => {
      state.registration = action.payload.registration;
    },
  },
});

export const { setRegistration } = adminSlice.actions;

export default adminSlice.reducer;
