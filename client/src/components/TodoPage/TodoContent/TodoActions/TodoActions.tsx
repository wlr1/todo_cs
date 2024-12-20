import React, { useCallback, useMemo, useState } from "react";

import { FaEdit } from "react-icons/fa";
import { MdDeleteForever, MdOutlineDoneAll } from "react-icons/md";

import { TodoActionsProps } from "../../../../utility/types/types";
import { AppDispatch } from "../../../../redux/store";
import { useDispatch } from "react-redux";
import {
  deleteTodo,
  isCompletedTodo,
} from "../../../../redux/slices/todoSlice/asyncActions";

import { sounds } from "../../../../sounds/sounds";
import useSound from "use-sound";

const TodoActions: React.FC<TodoActionsProps> = ({
  todoId,
  onDelete,
  onEdit,
  isDisabled,
}) => {
  const [isChildFormAnimation, setIsChildFormAnimation] = useState(false); //delete anim
  const [isCompleted, setIsCompleted] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const isSoundOn = useMemo(
    () => JSON.parse(localStorage.getItem("isSoundOn") || "true"),
    []
  );

  const [playDelete] = useSound(sounds.deleteSfx, {
    soundEnabled: isSoundOn,
    preload: true,
  });
  const [playComplete] = useSound(sounds.completeSfx, {
    soundEnabled: isSoundOn,
  });

  //complete todo
  const handleMarkComplete = useCallback(() => {
    if (isCompleted) return;
    setIsCompleted(true);

    dispatch(isCompletedTodo({ id: todoId, todoData: { isCompleted: true } }));

    playComplete();
  }, [dispatch, todoId, playComplete, isCompleted]);

  //delete todo
  const handleDelete = useCallback(() => {
    //animation for delete
    if (isChildFormAnimation) return;
    setIsChildFormAnimation(true);
    onDelete(true);
    playDelete();

    setTimeout(() => {
      dispatch(deleteTodo(todoId));
    }, 900);
  }, [dispatch, todoId, playDelete, isChildFormAnimation, onDelete]);

  return (
    <div className="w-8 h-[88px] bg-white/10  rounded-lg  flex justify-center items-center flex-col">
      <div className="hover:bg-white/20 flex w-8 h-8 rounded-t-lg items-center justify-center">
        <button
          onClick={handleMarkComplete}
          className="text-white hover:text-green-600 transition p-1 disabled:bg-gray-800/60 disabled:w-8 disabled:h-8 disabled:items-center disabled:justify-center disabled:flex disabled:rounded-t-lg disabled:text-green-600"
          disabled={isCompleted}
        >
          <MdOutlineDoneAll
            size={isCompleted ? 12 : 16}
            className="transition-all duration-500 ease-in-out "
          />
        </button>
      </div>

      <div className="hover:bg-white/20 flex w-8 h-8 items-center justify-center">
        <button
          onClick={onEdit}
          disabled={isDisabled}
          className="text-white hover:text-yellow-400 transition p-1 disabled:bg-gray-800/60  disabled:w-8 disabled:h-8 disabled:items-center disabled:justify-center disabled:flex disabled:text-yellow-400"
        >
          <FaEdit
            size={isDisabled ? 12 : 14}
            className="transition-all duration-500 ease-in-out "
          />
        </button>
      </div>

      <div className="hover:bg-white/20 rounded-b-lg flex w-8 h-8 items-center justify-center">
        <button
          onClick={handleDelete}
          className="text-white hover:text-red-400 transition p-1"
        >
          <MdDeleteForever size={16} />
        </button>
      </div>
    </div>
  );
};

export default TodoActions;
