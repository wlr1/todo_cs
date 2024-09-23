import React, { useState } from "react";
import TodoActions from "../TodoActions/TodoActions";
import { TodoItemProps } from "../../../../utility/types/types";
import { AppDispatch } from "../../../../redux/store";
import { useDispatch } from "react-redux";
import { updateTodo } from "../../../../redux/slices/todoSlice";

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [isFormAnimation, setIsFormAnimation] = useState(false); //delete anim

  const dispatch: AppDispatch = useDispatch();

  const deleteAnimationTodo = (value: boolean) => {
    setIsFormAnimation(value);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(updateTodo({ id: todo.id, todoData: { title, description } }));
    setIsEditing(false);
  };

  const formattedDate = new Date(todo.createdAt).toLocaleString("lv-LV", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`flex items-center space-x-2 animate__animated  ${
        isFormAnimation ? "animate__backOutLeft" : ""
      }`}
    >
      {/* Block on the left side */}
      <TodoActions
        todoId={todo.id}
        onDelete={deleteAnimationTodo}
        onEdit={handleEdit}
      />

      {/* Main Todo Card */}
      <div className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition flex-grow shadow-lg shadow-todoPal w-[88%]">
        {isEditing ? (
          <>
            {/* Form for editing Todo */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded mb-2 w-full"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded w-full"
            />
            <button
              onClick={handleSave}
              className="mt-2 bg-green-600 p-2 text-white rounded"
            >
              Saglabāt
            </button>
          </>
        ) : (
          <>
            {/* Todo Title and Info */}
            <div className="flex justify-between items-center mb-2">
              <span className="text-white text-xl font-semibold">
                {todo.title}
              </span>
              <div className="flex space-x-3">
                {/* CreatedAt */}
                <span className="text-sm text-gray-500">{formattedDate}</span>
                {/* Todo Card ID */}
                <span className="text-sm text-gray-500">#{todo.id}</span>
              </div>
            </div>

            {/* Todo Description */}
            <p className="text-gray-300 text-sm drop-shadow-lg z-10 break-words">
              {todo.description}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
