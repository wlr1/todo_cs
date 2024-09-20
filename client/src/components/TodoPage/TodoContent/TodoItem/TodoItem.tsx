import React from "react";
import TodoActions from "../TodoActions/TodoActions";
import { TodoItemProps } from "../../../../utility/types/types";

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const formattedDate = new Date(todo.createdAt).toLocaleString("lv-LV", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex items-center space-x-2 ">
      {/* <!-- Block on the left side --> */}

      <TodoActions todoId={todo.id} />

      <div className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition space-y-2 flex-grow shadow-lg shadow-todoPal">
        {/* <!-- Todo Title and Info --> */}
        <div className="flex justify-between items-center">
          <span className="text-white text-xl font-semibold">{todo.title}</span>
          <div className="flex space-x-3">
            {/* CreatedAt */}
            <span className="text-sm text-gray-500">{formattedDate}</span>
            {/* Todo Card ID */}
            <span className="text-sm text-gray-500">#{todo.id}</span>
          </div>
        </div>
        {/* <!-- Todo Description --> */}
        <div className="">
          <p className="text-gray-300 text-sm drop-shadow-lg">
            {todo.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
