import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../utils/axios";

export interface StudentState {

}

interface PayloadStudent {
 
}

const student =
  typeof window !== "undefined" ? localStorage.getItem("studentInfo") : "[]";

const initialState: StudentState = JSON.parse(student!);

export const fetchStudent = createAsyncThunk(
  "auth/me",
  async (
    {
      token,
      academic_year,
      student_id,
    }: { token: string; academic_year: string; student_id: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.get(
        `/api/students/${academic_year}/${student_id}`,
        {
          headers: {
            token,
          },
        }
      );
      const data = response.data as any;

      if (data && Object.keys(data).length > 0) {
        localStorage.setItem("studentInfo", JSON.stringify(data));
      }

      return { Student: data };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudent: (state, action: PayloadAction<PayloadStudent>) => {
      state = action.payload;
    },
    unsetStudent: (state) => {
      localStorage.removeItem("studentInfo");
    },
  },
  extraReducers: {
    // @ts-ignore
  },
});

export const { setStudent, unsetStudent } = studentSlice.actions;

export default studentSlice.reducer;
