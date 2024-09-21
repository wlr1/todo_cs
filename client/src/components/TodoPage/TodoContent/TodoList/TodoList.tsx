import React, { useEffect } from "react";
import TodoItem from "../TodoItem/TodoItem";
import { AppDispatch, RootState } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../../../../redux/slices/todoSlice";

const TodoList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { todos } = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="space-y-4 w-[88%] mx-auto ">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
