import React, { lazy, Suspense, useCallback, useMemo, useState } from "react";
import TodoActions from "../TodoActions/TodoActions";
import { TodoItemProps } from "../../../../utility/types/types";

import { sounds } from "../../../../sounds/sounds";
import useSound from "use-sound";

import { useSortable } from "@dnd-kit/sortable";

const EditForm = lazy(() => import("../EditForm/EditForm"));

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isFormAnimation, setIsFormAnimation] = useState(false); //delete anim
  const [playbackRate, setPlaybackRate] = useState(1.75);
  const [isEditLocked, setIsEditLocked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const { attributes, listeners, setNodeRef, isDragging } = useSortable({
    id: todo.id,
  });

  const isSoundOn = useMemo(
    () => JSON.parse(localStorage.getItem("isSoundOn") || "true"),
    []
  );

  const [playUI] = useSound(sounds.uiClickSfx, {
    playbackRate,
    interrupt: true,
    soundEnabled: isSoundOn,
    prelaod: true,
  });

  const deleteAnimationTodo = useCallback((value: boolean) => {
    setIsFormAnimation(value);
  }, []);

  //#FIXME works only after restart
  const handleEdit = useCallback(() => {
    if (isEditLocked) return;
    setIsDisabled(true);
    setIsEditing(true);
    setIsEditLocked(true);
    setPlaybackRate((prevRate) => {
      playUI();
      return prevRate;
    });
  }, [isEditLocked, playUI]);

  //#FIXME
  const formattedDate = useMemo(() => {
    return new Date(todo.createdAt).toLocaleString("lv-LV", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [todo.createdAt]);

  return (
    <div
      className={`flex items-center space-x-2 animate__animated  ${
        isFormAnimation ? "animate__backOutLeft" : ""
      } `}
    >
      {/* Block on the left side */}
      <div style={{ pointerEvents: isDragging ? "none" : "auto" }}>
        <TodoActions
          todoId={todo.id}
          onDelete={deleteAnimationTodo}
          onEdit={handleEdit}
          isDisabled={isDisabled}
        />
      </div>

      {/* Main Todo Card */}
      <div
        className={`bg-white/10 p-4 rounded-lg hover:bg-white/20 transition flex-grow shadow-lg shadow-todoPal w-[88%] ${
          todo.isCompleted ? "line-through opacity-50" : ""
        }`}
      >
        {isEditing ? (
          <Suspense fallback={<div>Loading...</div>}>
            <EditForm
              todo={todo}
              setIsEditing={setIsEditing}
              setIsEditLocked={setIsEditLocked}
              setIsDisabled={setIsDisabled}
            />
          </Suspense>
        ) : (
          <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={{
              opacity: isDragging ? 0.85 : 1,
              cursor: "grab",
              transition: "all 0.3s ease",
            }}
            className={`${
              isDragging ? " shadow-2xl transform   blur-sm" : ""
            } `}
          >
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
            <p className="text-gray-300 text-sm drop-shadow-lg  break-words leading-relaxed">
              {todo.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
