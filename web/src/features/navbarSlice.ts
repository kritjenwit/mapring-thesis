import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../utils/axios";

export interface NavbarState {
  navbars: any[];
  studentMenagementMenusubList: any[];
  studentClassRoomList: any[];
}

interface PayloadMenulist {
  studentMenagementMenusubList: any[];
  studentClassRoomList: any[];
}

const localStorageStudentClassRoomList =
  typeof window !== "undefined" ? localStorage.getItem("studentClassRoomList") : "[]";

const initialState: NavbarState = {
  navbars: [],
  studentMenagementMenusubList: [],
  studentClassRoomList: JSON.parse(localStorageStudentClassRoomList!),
};

export const fetchClassesMenu = createAsyncThunk(
  "menu",
  async ({ token }: { token: string }, thunkAPI) => {
    try {
      const response = await axios.get("/api/menu", {
        headers: {
          token,
        },
      });
      const data = response.data as any;
      if (data && data.length > 0) {
        localStorage.setItem("studentClassRoomList", JSON.stringify(data));
      }
      return { studentClassRoomList: data };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setMenuList: (state, action: PayloadAction<PayloadMenulist>) => {
      state.studentMenagementMenusubList =
        action.payload.studentMenagementMenusubList;
      state.studentClassRoomList = action.payload.studentClassRoomList;
    },
  },
  extraReducers: {
    // @ts-ignore
    [fetchClassesMenu.fulfilled]: (state, action: PayloadAction<PayloadMenulist>) => {
      state.studentClassRoomList = action.payload.studentClassRoomList;
    },
  },
});

export const { setMenuList } = navbarSlice.actions;

export default navbarSlice.reducer;
