import React from "react";
import TodoActions from "../TodoActions/TodoActions";

const TodoItem = () => {
  return (
    <div className="flex items-center space-x-2 ">
      {/* <!-- Block on the left side --> */}

      <TodoActions />

      <div className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition space-y-2 flex-grow shadow-lg shadow-todoPal">
        {/* <!-- Todo Title and Info --> */}
        <div className="flex justify-between items-center">
          <span className="text-white text-xl font-semibold">
            YMTnUMFasvRkeaSe1OkrW3E8Jp16SonQd5oFTX1uxHvrcK8NuDxY4xXrg9MTyWtwBrXHFeWTN4bOZ
          </span>
          <div className="flex space-x-3">
            {/* CreatedAt */}
            <span className="text-sm text-gray-500">2024.06.06 19:33</span>
            {/* Todo Card ID */}
            <span className="text-sm text-gray-500">#1</span>
          </div>
        </div>
        {/* <!-- Todo Description --> */}
        <p className="text-gray-300 text-sm drop-shadow-lg">
          This is a short description of the todo item. It explains the task in
          brief. This is a short description of the todo item. It explains the
          task in brief. This is a short description of the todo item. It
          explains the task in brief. This is a short description of the todo
          item. It explains the task in brief. This is a short description of
          the todo item. It explains the task in brief. This is a short
          description of the todo item. It explains the task in brief. This is a
          short description of the todo item. It explains the task in brief.
          This is a short description of the todo item. It explains the task in
          brief. This is a short description of the todo item. It explains the
          task in brief.ffffffff
        </p>
      </div>
    </div>
  );
};

export default TodoItem;
