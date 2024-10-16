import React, { useCallback, useMemo, useState } from "react";
import { RiCheckDoubleLine, RiCloseLine } from "react-icons/ri";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { EditFormProps } from "../../../../utility/types/types";
import { updateTodo } from "../../../../redux/slices/todoSlice/asyncActions";
import { AppDispatch } from "../../../../redux/store";
import { useDispatch } from "react-redux";
import uiClickSfx from "../../../../sounds/click.mp3";
import useSound from "use-sound";

const EditForm: React.FC<EditFormProps> = ({
  todo,
  setIsEditing,
  setIsEditLocked,
  setIsDisabled,
}) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [playbackRate, setPlaybackRate] = useState(1.75);
  const [newErrors, setNewErrors] = useState({
    title: "",
    description: "",
  });

  const isSoundOn = useMemo(
    () => JSON.parse(localStorage.getItem("isSoundOn") || "true"),
    []
  );
  const [playUI] = useSound(uiClickSfx, { playbackRate, interrupt: true });
  const dispatch: AppDispatch = useDispatch();

  const validate = useCallback(() => {
    let isValid = true;
    const errors = { title: "", description: "" };

    if (title.length < 3 || title.length > 77) {
      errors.title =
        title.length < 3
          ? "Title must be at least 3 characters."
          : "Title cannot exceed 77 characters.";
      isValid = false;
    }

    if (description.length < 3 || description.length > 700) {
      errors.description =
        title.length < 3
          ? "Description must be at least 3 characters."
          : "Description cannot exceed 77 characters.";
      isValid = false;
    }

    setNewErrors(errors);
    return isValid;
  }, [title, description]);

  const handleSave = () => {
    if (!validate()) return;

    dispatch(updateTodo({ id: todo.id, todoData: { title, description } }));
    setPlaybackRate(playbackRate);
    if (isSoundOn) playUI();
    setIsEditing(false);
  };

  const handleClose = () => {
    setPlaybackRate(playbackRate);
    if (isSoundOn) playUI();
    setIsDisabled(false);
    setIsEditLocked(false);
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
        {newErrors.title && (
          <div className="flex space-x-2 mt-1">
            <MdOutlineReportGmailerrorred size={19} color="red" />
            <p className="font-bold text-red-900 text-sm">{newErrors.title}</p>
          </div>
        )}
        {/* Description Textarea */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-white/10 text-white resize-none placeholder-gray-400 px-3 border border-gray-700 rounded-lg focus:ring-1 focus:ring-cyan-600 focus:border-cyan-600  outline-none transition-shadow shadow-lg shadow-todoPal"
          placeholder="Enter description..."
          rows={4}
        />
        {newErrors.description && (
          <div className="flex space-x-2 mt-1">
            <MdOutlineReportGmailerrorred size={19} color="red" />
            <p className="font-bold text-red-900 text-sm">
              {newErrors.description}
            </p>
          </div>
        )}

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
