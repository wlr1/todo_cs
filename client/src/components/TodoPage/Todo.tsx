import React from "react";
import TodoContent from "./TodoContent/TodoContent";

const Todo = () => {
  return (
    <>
      <div className="bg-bgMain h-screen bg-cover bg-center">
        <div className="">
          <TodoContent />
        </div>
      </div>
    </>
  );
};

export default Todo;
