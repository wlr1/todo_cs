import React, { useEffect, useState } from "react";
import TodoList from "./TodoList/TodoList";
import TodoToolbar from "./TodoToolbar/TodoToolbar";

const TodoContent = () => {
  const [isFormAnimation, setIsFormAnimation] = useState(false);

  useEffect(() => {
    setIsFormAnimation(!isFormAnimation);
  }, []);

  return (
    <div className="flex h-full w-full relative  ">
      <div className="rounded-r-lg shadow-custom shadow-gray-950 overflow-hidden">
        <div
          className={`animate__animated  ${
            isFormAnimation ? "animate__zoomIn" : ""
          }`}
        >
          {/* Todo add btn and search bar */}
          <div className="">
            <TodoToolbar />
          </div>

          {/* Todo list */}
          <div className="overflow-y-scroll max-h-[75vh] custom-scrollbar">
            <TodoList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoContent;
