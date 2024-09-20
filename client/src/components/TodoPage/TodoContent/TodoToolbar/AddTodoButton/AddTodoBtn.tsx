import React, { useState } from "react";
import { LuPlus } from "react-icons/lu";

const AddTodoBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const OpenModal = () => setIsModalOpen(true);
  const CloseModal = () => setIsModalOpen(false);

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
            <div className="mb-4">
              <label className="block mb-2">Title (max 77 words):</label>
              <input
                type="text"
                maxLength={77}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Description (max 700 words):</label>
              <textarea
                maxLength={700}
                className="w-full p-2 border rounded h-24"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Is Complete:</label>
              <select className="w-full p-2 border rounded">
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
              />
            </div>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                onClick={CloseModal}
              >
                Cancel
              </button>
              <button className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                Add Todo
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTodoBtn;

// <div className="absolute -top-6 flex items-center justify-center bg-black bg-opacity-50 z-50 w-screen min-h-screen">
// <div className="bg-white rounded-lg  shadow-lg w-1/3 h-screen p-6">
//   <h2 className="text-xl font-bold mb-4">This is a Modal</h2>
//   <p className="mb-4">Here you can add some text or components.</p>
//   <button
//     className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
//     onClick={CloseModal}
//   >
//     Close Modal
//   </button>
// </div>
// </div>
