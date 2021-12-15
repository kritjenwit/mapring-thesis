import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";
import axios from "../utils/axios";

interface User {
  token: string;
  username: string;
  role: number;
}

interface PayloadUser {
  user: User;
}

export interface UserState {
  isLoggedIn: boolean;
  user: User | null;
}
interface APIResponse {
  code: number;
  data?: User | null;
  message: string;
}

const localStorageUser =
  typeof window !== "undefined" ? localStorage.getItem("user") : "{}";

const user = JSON.parse(localStorageUser!);

const initialState: UserState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export const userLogin = createAsyncThunk(
  "auth/login",
  async (
    { username, password }: { username: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = (await axios.post("/api/auth/login", {
        username,
        password,
      })) as AxiosResponse<APIResponse>;
      const data = response.data;
      if (data.data?.token) {
        localStorage.setItem("user", JSON.stringify(data.data));
      }
      return { user: data.data };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const userLogout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("user");
});

export const fetchMe = createAsyncThunk(
  "auth/me",
  async ({ token }: { token: string }, thunkAPI) => {
    try {
      const response = await axios.get("/api/auth/me", {
        headers: {
          token,
        },
      });
      console.log(response);
      return response.status === 200 && response.data === "ok";
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// @ts-ignore
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    // @ts-ignore
    [userLogin.fulfilled]: (state, action: PayloadAction<PayloadUser>) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    // @ts-ignore
    [userLogout.fulfilled]: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    // @ts-ignore
    [fetchMe.fulfilled]: (state) => {
      state.isLoggedIn = true;
    },
    // @ts-ignore
    [fetchMe.rejected]: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
