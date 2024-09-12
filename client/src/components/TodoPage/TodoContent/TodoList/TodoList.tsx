import React from "react";
import TodoItem from "../TodoItem/TodoItem";

const TodoList = () => {
  return (
    <div className="space-y-4 w-[88%] mx-auto">
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
    </div>
  );
};

export default TodoList;
