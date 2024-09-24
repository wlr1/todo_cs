import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TodoState, CreateUpdateTodoPayload } from "../../utility/types/types";
import api from "../api";

const initialState: TodoState = {
  error: null,
  isLoading: false,
  todos: [],
  selectedTodo: null,
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

//create
export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (
    { title, description, createdAt, isCompleted }: CreateUpdateTodoPayload,
    thunkAPI
  ) => {
    try {
      const todoData = { title, description, createdAt, isCompleted };

      const res = await api.post("/api/Todo/create", todoData);
      return res.data;
    } catch (error: any) {
      console.error("Failed to create todo: ", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to create Todo"
      );
    }
  }
);

//update
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (
    {
      id,
      todoData,
    }: { id: number; todoData: { title: string; description: string } },
    thunkAPI
  ) => {
    try {
      const res = await api.put(`/api/Todo/update/${id}`, todoData);
      return res.data;
    } catch (error: any) {
      console.error("Failed to update todo: ", error);
      thunkAPI.rejectWithValue(error.response?.data || "Failed to update todo");
    }
  }
);

//complete todo
export const isCompletedTodo = createAsyncThunk(
  "todos/isCompletedTodo",
  async (
    {
      id,
      todoData,
    }: {
      id: number;
      todoData: { isCompleted: boolean };
    },
    thunkAPI
  ) => {
    try {
      const res = await api.put(`/api/Todo/isCompleted/${id}`, todoData);
      return res.data;
    } catch (error: any) {
      console.error("failed to complete todo: ", error);
      thunkAPI.rejectWithValue(
        error.response?.data || "failed to complete todo"
      );
    }
  }
);

//find by id
export const findByIdTodo = createAsyncThunk(
  "todos/findByIdTodo",
  async (id: number, thunkAPI) => {
    try {
      const res = await api.get(`/api/Todo/${id}`, { withCredentials: true });
      return res.data;
    } catch (error: any) {
      console.error("Failed to find todo by id: ", error);
      thunkAPI.rejectWithValue(
        error.response?.data || "Failed to find todo by id"
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
      //create todo
      .addCase(createTodo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos.push(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      //update todo
      .addCase(updateTodo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      //isCompleted todo
      .addCase(isCompletedTodo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(isCompletedTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(isCompletedTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      //find by id
      .addCase(findByIdTodo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(findByIdTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        const todo = state.todos.find((todo) => todo.id === action.payload.id);

        if (todo) {
          state.selectedTodo = todo;
        } else {
          state.selectedTodo = null;
        }
      })
      .addCase(findByIdTodo.rejected, (state, action) => {
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
