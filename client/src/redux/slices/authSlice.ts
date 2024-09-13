import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

interface AuthState {
  error: string | null;
  user: any | null;
  isLoading: boolean;
  token: string | null;
}

const initialState: AuthState = {
  error: null,
  user: null,
  isLoading: false,
  token: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const res = await api.post("/Account/login", { email, password });
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Login Failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    userData: {
      email: string;
      password: string;
      username: string;
      lastname: string;
      firstname: string;
    },
    thunkAPI
  ) => {
    try {
      const res = await api.post("Account/register", userData);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.res.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        document.cookie = `jwt=${action.payload.token}; path=/;`;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
