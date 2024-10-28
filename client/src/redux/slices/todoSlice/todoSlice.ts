import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoState } from "../../../utility/types/types";
import {
  createTodo,
  deleteTodo,
  fetchTodos,
  findByIdTodo,
  isCompletedTodo,
  updateTodo,
  updateTodoOrder,
} from "./asyncActions";

const initialState: TodoState = {
  error: null,
  isLoading: false,
  todos: [],
  selectedTodo: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch todos
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
      })
      //create todo
      .addCase(createTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos.push(action.payload);
      })
      //update todo
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      //isCompleted todo
      .addCase(isCompletedTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      //find by id
      .addCase(findByIdTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        const todo = state.todos.find((todo) => todo.id === action.payload.id);

        if (todo) {
          state.selectedTodo = todo;
        } else {
          state.selectedTodo = null;
        }
      })
      //delete todo
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      // update order
      .addCase(updateTodoOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        action.payload.forEach((orderedTodo) => {
          //Searches for the given todo object in the state 'todos' array by id
          const todo = state.todos.find((t) => t.id === orderedTodo.id);
          //If a todo is found, restore its 'order' field
          if (todo) {
            todo.order = orderedTodo.order;
          }
        });
        //Sorts the 'todos' array by the 'order' field so that they are displayed in the correct order
        state.todos.sort((a, b) => a.order - b.order);
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload as string;
        }
      );
  },
});

export default todoSlice.reducer;
