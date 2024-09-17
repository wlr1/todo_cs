import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";
import { UserState } from "../../utility/types/types";

const initialState: UserState = {
  error: null,
  user: null,
  isLoading: false,
  avatar: undefined,
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

export const getAvatar = createAsyncThunk(
  "user/getAvatar",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/Account/download-avatar", {
        withCredentials: true,
        responseType: "blob",
      });

      const avatarUrl = URL.createObjectURL(res.data);
      return avatarUrl;
    } catch (error: any) {
      console.error("Failed to fetch avatar: ", error.message);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to get avatar"
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
      })
      .addCase(getAvatar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.avatar = action.payload;
      })
      .addCase(getAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
