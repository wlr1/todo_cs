import React, { useState } from "react";
import TodoActions from "../TodoActions/TodoActions";
import { TodoItemProps } from "../../../../utility/types/types";
import uiClickSfx from "../../../../sounds/click.mp3";
import EditForm from "../EditForm/EditForm";
import useSound from "use-sound";

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isFormAnimation, setIsFormAnimation] = useState(false); //delete anim
  const [playbackRate, setPlaybackRate] = React.useState(1.75);
  const [isEditLocked, setIsEditLocked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [playUI] = useSound(uiClickSfx, { playbackRate, interrupt: true });

  const isSoundOn = JSON.parse(localStorage.getItem("isSoundOn") || "true");

  const deleteAnimationTodo = (value: boolean) => {
    setIsFormAnimation(value);
  };

  const handleEdit = () => {
    if (isEditLocked) return;
    setIsDisabled(true);
    setIsEditing(true);
    setIsEditLocked(true);
    setPlaybackRate(playbackRate);
    if (isSoundOn) {
      playUI();
    }
  };

  //#FIXME
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
        isDisabled={isDisabled}
      />

      {/* Main Todo Card */}
      <div
        className={`bg-white/10 p-4 rounded-lg hover:bg-white/20 transition flex-grow shadow-lg shadow-todoPal w-[88%] ${
          todo.isCompleted ? "line-through opacity-50" : ""
        }`}
      >
        {isEditing ? (
          <EditForm
            todo={todo}
            setIsEditing={setIsEditing}
            setIsEditLocked={setIsEditLocked}
            setIsDisabled={setIsDisabled}
          />
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
            <p className="text-gray-300 text-sm drop-shadow-lg z-10 break-words leading-relaxed">
              {todo.description}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
