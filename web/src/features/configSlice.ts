import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../utils/axios";

export interface ConfigState {
  academicYear: number | string;
  academicTerm: number | string;
  dropdown: {
    sleepness: any[];
    disability: any[];
    disadvantaged: any[];
    journey: any[];
    momDadStatus: any[];
    races: any[];
    nationality: any[];
    religion: any[];
    nameTitle: any[];
    gender: any[];
    classType: any[];
    years: any[];
    rooms: any[];
    subjects: any[];
    houseType: any[];
    manners: any[];
    cardType: any[];
    studentJoinType: any[];
    bloodType: any[];
    classTypeV2: any[];
    provinces: any[];
    amphures: any[];
    tambol: any[];
    parentNameTitle: any[];
    jobs: any[];
  };
}

interface PayloadConfig {
  academicYear: number | string;
  academicTerm: number | string;
  dropdown: {
    sleepness: any[];
    disability: any[];
    disadvantaged: any[];
    journey: any[];
    momDadStatus: any[];
    races: any[];
    nationality: any[];
    religion: any[];
    nameTitle: any[];
    gender: any[];
    classType: any[];
    years: any[];
    rooms: any[];
    subjects: any[];
    houseType: any[];
    manners: any[];
    cardType: any[];
    studentJoinType: any[];
    bloodType: any[];
    classTypeV2: any[];
    provinces: any[];
    amphures: any[];
    tambol: any[];
    parentNameTitle: any[];
    jobs: any[];
  };
}

const config =
  typeof window !== "undefined" ? localStorage.getItem("appConfig") : "[]";

const initialState: ConfigState = JSON.parse(config!);

export const fetchConfig = createAsyncThunk(
  "auth/me",
  async ({ token }: { token: string }, thunkAPI) => {
    try {
      const response = await axios.get("/api/app/config", {
        headers: {
          token,
        },
      });
      const data = response.data as any;

      if (data && Object.keys(data).length > 0) {
        localStorage.setItem("appConfig", JSON.stringify(data));
      }

      return { config: data };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setConfig: (state, action: PayloadAction<PayloadConfig>) => {
      state = action.payload;
    },
    unsetConfig: (state) => {
      localStorage.removeItem("appConfig");
    },
  },
  extraReducers: {
    // @ts-ignore
  },
});

export const { setConfig, unsetConfig } = configSlice.actions;

export default configSlice.reducer;
