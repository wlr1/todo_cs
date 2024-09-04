import React from "react";

const TodoContent = () => {
  return (
    <div className="flex h-full relative">
      <div className="bg-bgTodoBlock bg-no-repeat bg-center  w-full rounded-r-lg shadow-custom shadow-gray-700 overflow-hidden">
        <div
          className="absolute inset-0 bg-opacity-50 backdrop-blur-md rounded-r-lg "
          style={{ backdropFilter: "blur(11px)" }}
        >
          <div>test</div>
        </div>
      </div>
    </div>
  );
};

export default TodoContent;
