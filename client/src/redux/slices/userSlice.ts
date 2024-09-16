import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

interface UserState {
  error: string | null;
  user: any | null;
  isLoading: boolean;
}

const initialState: UserState = {
  error: null,
  user: null,
  isLoading: false,
};

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/Account/user-info", {
        withCredentials: true,
      });
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "Failed to fetch user info"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
