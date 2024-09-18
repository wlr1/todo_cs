import React, { useEffect, useState } from "react";
import TodoList from "./TodoList/TodoList";
import TodoToolbar from "./TodoToolbar/TodoToolbar";

const TodoContent = () => {
  const [isFormAnimation, setIsFormAnimation] = useState(false);

  useEffect(() => {
    setIsFormAnimation(!isFormAnimation);
  }, []);

  return (
    <div className="flex h-full relative  ">
      <div className=" w-full rounded-r-lg shadow-custom shadow-gray-950 overflow-hidden">
        <div
          className={`animate__animated  ${
            isFormAnimation ? "animate__zoomIn" : ""
          }`}
        >
          {/* Todo add btn and search bar */}
          <TodoToolbar />

          {/* Todo list */}
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default TodoContent;
