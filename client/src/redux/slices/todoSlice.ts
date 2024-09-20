import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TodoState, Todo } from "../../utility/types/types";
import api from "../api";

const initialState: TodoState = {
  error: null,
  isLoading: false,
  todos: [],
};

//get
export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/api/Todo");
      return res.data;
    } catch (error: any) {
      console.error("Failed to fetch todo: ", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "failed to fetch todo"
      );
    }
  }
);

//delete
export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: number, thunkAPI) => {
    try {
      await api.delete(`/api/Todo/delete/${id}`);
      return id;
    } catch (error: any) {
      console.error("Failed to delete todo: ", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "failed to delete todo"
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
      })
      //delete todo
      .addCase(deleteTodo.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  },
});

export default todoSlice.reducer;
