import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TodoState, Todo } from "../../utility/types/types";
import api from "../api";

const initialState: TodoState = {
  error: null,
  isLoading: false,
  todos: [],
};

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/api/Todo", { withCredentials: true });
      return res.data;
    } catch (error: any) {
      console.error("Failed to fetch todo: ", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "failed to fetch todo"
      );
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default todoSlice.reducer;
