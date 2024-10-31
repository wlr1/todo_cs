import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const res = await api.post("/Account/login", {
        email,
        password,
      });
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
      const res = await api.post("/Account/register", userData);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Register failed"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await api.post("/Account/logout", {}, { withCredentials: true });

      return;
    } catch (error: any) {
      console.log("Logout error: ", error);
      return thunkAPI.rejectWithValue(error.response?.data || "Logout failed");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (_, thunkAPI) => {
    try {
      await api.delete("/Account/delete", { withCredentials: true });

      return;
    } catch (error: any) {
      console.log("Delete error: ", error);
      return thunkAPI.rejectWithValue(error.response?.data || "Delete failed");
    }
  }
);
