import React, { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { AppDispatch } from "../../../../../redux/store";
import { useDispatch } from "react-redux";
import { createTodo } from "../../../../../redux/slices/todoSlice";

const AddTodoBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [isCompleted, setIsCompleted] = useState("no");

  const dispatch: AppDispatch = useDispatch();

  const OpenModal = () => setIsModalOpen(true);
  const CloseModal = () => setIsModalOpen(false);

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
        <div className="absolute -top-28 flex items-center justify-center bg-black bg-opacity-50 z-50 w-screen min-h-screen">
          <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
            <h2 className="text-xl font-bold mb-4">Add New Todo</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Title (max 77 words):</label>
                <input
                  type="text"
                  maxLength={77}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">
                  Description (max 700 words):
                </label>
                <textarea
                  maxLength={700}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border rounded h-24"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Is Complete:</label>
                <select
                  value={isCompleted}
                  onChange={(e) => setIsCompleted(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">
                  Time created at (dd/mm/yy hh:mm):
                </label>
                <input
                  type="datetime-local"
                  className="w-full p-2 border rounded"
                  value={createdAt}
                  onChange={(e) => setCreatedAt(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                  onClick={CloseModal}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                  type="submit"
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
