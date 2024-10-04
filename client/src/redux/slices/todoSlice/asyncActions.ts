import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
import { CreateUpdateTodoPayload } from "../../../utility/types/types";

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
