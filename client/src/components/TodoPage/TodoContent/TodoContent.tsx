import React from "react";
import TodoList from "./TodoList/TodoList";
import TodoToolbar from "./TodoToolbar/TodoToolbar";

const TodoContent = () => {
  return (
    <div className="flex h-full relative  ">
      <div className=" w-full rounded-r-lg shadow-custom shadow-gray-950 overflow-hidden">
        {/* Todo add btn and search bar */}
        <TodoToolbar />

        {/* Todo list */}
        <TodoList />
      </div>
    </div>
  );
};

export default TodoContent;
