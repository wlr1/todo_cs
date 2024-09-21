import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { AppDispatch } from "../../../../../redux/store";
import { useDispatch } from "react-redux";
import { createTodo } from "../../../../../redux/slices/todoSlice";
import { TbChecklist, TbFileDescription } from "react-icons/tb";
import { MdOutlineAddCircleOutline, MdTitle } from "react-icons/md";
import { GrSchedules } from "react-icons/gr";
import "animate.css";

const AddTodoBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [isCompleted, setIsCompleted] = useState("no");
  const [isFormAnimation, setIsFormAnimation] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const OpenModal = () => setIsModalOpen(true);
  const CloseModal = () => {
    setIsFormAnimation(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsFormAnimation(false);
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTodo = {
      title,
      description,
      createdAt,
      isCompleted: isCompleted === "yes", //string to bool
    };

    dispatch(createTodo(newTodo));

    //after submission, clearing fields
    setTitle("");
    setDescription("");
    setIsCompleted("no");
    setCreatedAt("");
  };

  return (
    <>
      <div className="absolute right-0">
        <button
          onClick={OpenModal}
          className="mr-3 bg-white/10 text-white p-3 rounded-full hover:bg-white/20 transition "
        >
          <LuPlus size={21} className="text-btnTodo" />
        </button>
      </div>
      {isModalOpen && (
        <div
          className={`fixed -top-6 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg z-50 w-full h-[800px] transition-opacity duration-300 ease-in-out animate__animated animate__faster ${
            isFormAnimation ? "animate__fadeOut" : "animate__fadeIn"
          } `}
        >
          <div className="bg-[#2b2f34]   bg-opacity-90 rounded-2xl shadow-xl shadow-[#384d4d] w-[400px] max-w-[90%] p-6 relative transform transition-all duration-500 ease-in-out scale-95 hover:scale-100">
            {/* Modal Title */}
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <span className=" mr-2 text-blue-400 text-3xl">
                <MdOutlineAddCircleOutline />
              </span>
              Add New Todo
            </h2>

            {/* Form Start */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title Field */}
              <div className="relative">
                <label className="text-gray-400 text-sm mb-1 flex items-center">
                  <span className=" mr-2 text-blue-400">
                    <MdTitle size={16} />
                  </span>
                  Title
                </label>
                <input
                  type="text"
                  maxLength={77}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your title..."
                  className="w-full p-3 text-white bg-[#1c1e22] border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-gray-500 transition duration-300 ease-in-out"
                />
              </div>

              {/* Description Field */}
              <div className="relative">
                <label className=" text-gray-400 text-sm mb-1 flex items-center">
                  <span className=" mr-2 text-blue-400">
                    <TbFileDescription size={16} />
                  </span>
                  Description
                </label>
                <textarea
                  maxLength={700}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter the task description..."
                  className="w-full p-3 h-28 text-white bg-[#1c1e22] border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-gray-500 transition duration-300 ease-in-out"
                ></textarea>
              </div>

              {/* Is Completed Dropdown */}
              <div className="relative">
                <label className=" text-gray-400 text-sm mb-1 flex items-center">
                  <span className=" mr-2 text-blue-400">
                    <TbChecklist size={18} />
                  </span>
                  Is Complete
                </label>
                <select
                  value={isCompleted}
                  onChange={(e) => setIsCompleted(e.target.value)}
                  className="w-full p-3 text-white bg-[#1c1e22] border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>

              {/* Time Created */}
              <div className="relative">
                <label className=" text-gray-400 text-sm mb-1 flex items-center">
                  <span className=" mr-2 text-blue-400">
                    <GrSchedules size={15} />
                  </span>
                  Time Created
                </label>
                <input
                  type="datetime-local"
                  value={createdAt}
                  onChange={(e) => setCreatedAt(e.target.value)}
                  required
                  className="cursor-text w-full p-3 text-white bg-[#1c1e22] border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-6">
                <button
                  type="button"
                  className="px-4 py-2 text-red-500 bg-transparent hover:bg-red-600 hover:text-white rounded-lg border border-red-500 transition duration-300 ease-in-out"
                  onClick={CloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300 ease-in-out"
                >
                  Add Todo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTodoBtn;
