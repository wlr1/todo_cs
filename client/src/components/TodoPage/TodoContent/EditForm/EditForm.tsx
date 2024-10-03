import React, { useState } from "react";
import { RiCheckDoubleLine, RiCloseLine } from "react-icons/ri";
import { EditFormProps } from "../../../../utility/types/types";
import { updateTodo } from "../../../../redux/slices/todoSlice";
import { AppDispatch } from "../../../../redux/store";
import { useDispatch } from "react-redux";
import uiClickSfx from "../../../../sounds/click.mp3";
import useSound from "use-sound";

const EditForm: React.FC<EditFormProps> = ({ todo, setIsEditing }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [playbackRate, setPlaybackRate] = React.useState(1.75);

  const isSoundOn = JSON.parse(localStorage.getItem("isSoundOn") || "true");

  const [playUI] = useSound(uiClickSfx, { playbackRate, interrupt: true });

  const dispatch: AppDispatch = useDispatch();

  const handleSave = () => {
    dispatch(updateTodo({ id: todo.id, todoData: { title, description } }));
    setPlaybackRate(playbackRate);
    if (isSoundOn) {
      playUI();
    }
    setIsEditing(false);
  };

  const handleClose = () => {
    setPlaybackRate(playbackRate);
    if (isSoundOn) {
      playUI();
    }
    setIsEditing(false);
  };

  return (
    <>
      {/* Edit Form */}
      <div className="space-y-4">
        {/* Title Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-white/10 text-white resize-none placeholder-gray-400 px-3 border border-gray-700 rounded-lg focus:ring-1 focus:ring-cyan-600 focus:border-cyan-600 p-3 outline-none transition-shadow shadow-lg shadow-todoPal"
          placeholder="Enter title..."
        />

        {/* Description Textarea */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-white/10 text-white resize-none placeholder-gray-400 px-3 border border-gray-700 rounded-lg focus:ring-1 focus:ring-cyan-600 focus:border-cyan-600  outline-none transition-shadow shadow-lg shadow-todoPal"
          placeholder="Enter description..."
          rows={4}
        />

        {/* Save Button */}
        <div className="flex justify-end mt-4 space-x-4">
          {/* Close Icon */}
          <div
            onClick={handleClose}
            className="cursor-pointer p-2 bg-white/10 rounded-full hover:bg-red-400/10 transition-all duration-200 hover:scale-110 focus:ring-2 focus:ring-red-500 focus:outline-none backdrop-blur-md shadow-md"
            title="Close"
          >
            <RiCloseLine
              size={24}
              className="text-red-500 hover:text-red-800 transition-all"
            />
          </div>

          {/* Save Icon */}
          <div
            onClick={handleSave}
            className="cursor-pointer p-2 bg-white/10 rounded-full hover:bg-green-400/10 transition-all duration-200 hover:scale-110 focus:ring-2 focus:ring-green-500 focus:outline-none backdrop-blur-md shadow-md"
            title="Save"
          >
            <RiCheckDoubleLine
              size={24}
              className="text-green-500 hover:text-green-600 transition-all"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditForm;
