import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever, MdOutlineDoneAll } from "react-icons/md";
import { TodoActionsProps } from "../../../../utility/types/types";
import { AppDispatch } from "../../../../redux/store";
import { useDispatch } from "react-redux";
import {
  deleteTodo,
  isCompletedTodo,
} from "../../../../redux/slices/todoSlice/asyncActions";
import deleteSfx from "../../../../sounds/delete.mp3";
import completeSfx from "../../../../sounds/complete.mp3";

import useSound from "use-sound";

const TodoActions: React.FC<TodoActionsProps> = ({
  todoId,
  onDelete,
  onEdit,
}) => {
  const [isChildFormAnimation, setIsChildFormAnimation] = useState(false); //delete anim

  const isSoundOn = JSON.parse(localStorage.getItem("isSoundOn") || "true");

  const [playDelete] = useSound(deleteSfx);
  const [playComplete] = useSound(completeSfx);

  const dispatch: AppDispatch = useDispatch();

  //complete todo
  const handleMarkComplete = () => {
    dispatch(isCompletedTodo({ id: todoId, todoData: { isCompleted: true } }));
    if (isSoundOn) {
      playComplete();
    }
  };

  //delete todo
  const handleDelete = () => {
    //animation for delete
    const newValue = !isChildFormAnimation;
    setIsChildFormAnimation(newValue);
    onDelete(newValue);

    if (isSoundOn) {
      playDelete();
    }

    setTimeout(() => {
      dispatch(deleteTodo(todoId));
    }, 900);
  };

  return (
    <div className="w-8 h-[88px] bg-white/10  rounded-lg  flex justify-center items-center flex-col">
      <div className="hover:bg-white/20 flex w-8 h-8 rounded-t-lg items-center justify-center">
        <button
          onClick={handleMarkComplete}
          className="text-white hover:text-green-600 transition p-1 "
        >
          <MdOutlineDoneAll size={16} />
        </button>
      </div>

      <div className="hover:bg-white/20 flex w-8 h-8 items-center justify-center">
        <button
          onClick={onEdit}
          className="text-white hover:text-yellow-400 transition p-1"
        >
          <FaEdit size={14} />
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
