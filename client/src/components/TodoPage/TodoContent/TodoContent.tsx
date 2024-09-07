import React from "react";

import AddTodoBtn from "./AddTodoButton/AddTodoBtn";
import TodoList from "./TodoList/TodoList";

const TodoContent = () => {
  return (
    <div className="flex h-full relative  ">
      <div className=" w-full rounded-r-lg shadow-custom shadow-gray-950 overflow-hidden">
        {/* <!-- Add Todo Button --> */}
        <AddTodoBtn />

        {/* Todo list */}
        <TodoList />
      </div>
    </div>
  );
};

export default TodoContent;
