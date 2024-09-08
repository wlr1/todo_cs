import React from "react";
import SearchTodo from "./SearchTodo/SearchTodo";
import AddTodoBtn from "./AddTodoButton/AddTodoBtn";

const TodoToolbar = () => {
  return (
    <div className="flex relative justify-center items-center mt-6 mb-6 w-full">
      <AddTodoBtn />
      <SearchTodo />
    </div>
  );
};

export default TodoToolbar;
