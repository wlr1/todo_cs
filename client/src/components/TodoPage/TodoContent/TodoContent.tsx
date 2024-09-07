import React from "react";
import { FaEdit } from "react-icons/fa";

import { LuPlus } from "react-icons/lu";
import { MdDeleteForever, MdOutlineDoneAll } from "react-icons/md";

const TodoContent = () => {
  return (
    <div className="flex h-full relative  ">
      <div className=" w-full rounded-r-lg shadow-custom shadow-gray-950 overflow-hidden">
        {/* <!-- Add Todo Button --> */}
        <div className="flex justify-end m-4">
          <button className="bg-white/10 text-white p-3 rounded-full hover:bg-white/20 transition">
            <LuPlus size={21} color="lightgreen" />
          </button>
        </div>

        <div className="space-y-4 w-[88%] mx-auto">
          {/* <!-- Todo Card 1 --> */}
          <div className="flex items-start space-x-3  ">
            {/* <!-- Block on the left side --> */}
            <div className="w-8 h-[88px] bg-white/10  rounded-lg  flex justify-center items-center flex-col ">
              <div className="hover:bg-white/20 flex w-8 h-8 rounded-t-lg items-center justify-center">
                <button className="text-white hover:text-green-600 transition p-1 ">
                  <MdOutlineDoneAll size={16} />
                </button>
              </div>

              <div className="hover:bg-white/20 flex w-8 h-8 items-center justify-center">
                <button className="text-white hover:text-yellow-400 transition p-1">
                  <FaEdit size={14} />
                </button>
              </div>

              <div className="hover:bg-white/20 rounded-b-lg flex w-8 h-8 items-center justify-center">
                <button className="text-white hover:text-red-400 transition p-1">
                  <MdDeleteForever size={16} />
                </button>
              </div>
            </div>
            <div className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition space-y-2 flex-grow shadow-lg shadow-todoPal">
              {/* <!-- Todo Title and Info --> */}
              <div className="flex justify-between items-center">
                <span className="text-white text-xl font-semibold">
                  YMTnUMFasvRkeaSe1OkrW3E8Jp16SonQd5oFTX1uxHvrcK8NuDxY4xXrg9MTyWtwBrXHFeWTN4bOZ
                </span>
                <div className="flex space-x-3">
                  {/* Todo Card ID */}
                  <span className="text-sm text-gray-500">
                    2024.06.06 19:33
                  </span>
                  <span className="text-sm text-gray-500">#1</span>
                </div>
              </div>
              {/* <!-- Todo Description --> */}
              <p className="text-gray-300 text-sm drop-shadow-lg">
                This is a short description of the todo item. It explains the
                task in brief.
              </p>
            </div>
          </div>

          {/* <!-- Todo Card 1 --> */}
          <div className="flex items-center space-x-3 ">
            {/* <!-- Block on the left side --> */}
            <div className="w-8 h-[88px] bg-white/10  rounded-lg  flex justify-center items-center flex-col">
              <div className="hover:bg-white/20 flex w-8 h-8 rounded-t-lg items-center justify-center">
                <button className="text-white hover:text-green-600 transition p-1 ">
                  <MdOutlineDoneAll size={16} />
                </button>
              </div>

              <div className="hover:bg-white/20 flex w-8 h-8 items-center justify-center">
                <button className="text-white hover:text-yellow-400 transition p-1">
                  <FaEdit size={14} />
                </button>
              </div>

              <div className="hover:bg-white/20 rounded-b-lg flex w-8 h-8 items-center justify-center">
                <button className="text-white hover:text-red-400 transition p-1">
                  <MdDeleteForever size={16} />
                </button>
              </div>
            </div>

            <div className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition space-y-2 flex-grow shadow-lg shadow-todoPal">
              {/* <!-- Todo Title and Info --> */}
              <div className="flex justify-between items-center">
                <span className="text-white text-xl font-semibold">
                  Todo Title 1
                </span>
                <div className="flex space-x-3">
                  {/* Todo Card ID */}
                  <span className="text-sm text-gray-500">
                    2024.06.06 19:33
                  </span>
                  <span className="text-sm text-gray-500">#1</span>
                </div>
              </div>
              {/* <!-- Todo Description --> */}
              <p className="text-gray-300 text-sm drop-shadow-lg">
                This is a short description of the todo item. It explains the
                task in brief. This is a short description of the todo item. It
                explains the task in brief. This is a short description of the
                todo item. It explains the task in brief. This is a short
                description of the todo item. It explains the task in brief.
                This is a short description of the todo item. It explains the
                task in brief. This is a short description of the todo item. It
                explains the task in brief. This is a short description of the
                todo item. It explains the task in brief. This is a short
                description of the todo item. It explains the task in brief.
                This is a short description of the todo item. It explains the
                task in brief.
              </p>
            </div>
          </div>

          {/* <!-- Todo Card 1 --> */}
          <div className="flex items-center space-x-3 ">
            {/* <!-- Block on the left side --> */}
            <div className="w-8 h-[88px] bg-white/10  rounded-lg  flex justify-center items-center flex-col">
              <div className="hover:bg-white/20 flex w-8 h-8 rounded-t-lg items-center justify-center">
                <button className="text-white hover:text-green-600 transition p-1 ">
                  <MdOutlineDoneAll size={16} />
                </button>
              </div>

              <div className="hover:bg-white/20 flex w-8 h-8 items-center justify-center">
                <button className="text-white hover:text-yellow-400 transition p-1">
                  <FaEdit size={14} />
                </button>
              </div>

              <div className="hover:bg-white/20 rounded-b-lg flex w-8 h-8 items-center justify-center">
                <button className="text-white hover:text-red-400 transition p-1">
                  <MdDeleteForever size={16} />
                </button>
              </div>
            </div>
            <div className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition space-y-2 flex-grow shadow-lg shadow-todoPal">
              {/* <!-- Todo Title and Info --> */}
              <div className="flex justify-between items-center">
                <span className="text-white text-xl font-semibold">
                  Todo Title 1
                </span>
                <div className="flex space-x-3">
                  {/* Todo Card ID */}
                  <span className="text-sm text-gray-500">
                    2024.06.06 19:33
                  </span>
                  <span className="text-sm text-gray-500">#1</span>
                </div>
              </div>
              {/* <!-- Todo Description --> */}
              <p className="text-gray-300 text-sm drop-shadow-lg">
                This is a short description of the todo item. It explains the
                task in brief. This is a short description of the todo item. It
                explains the task in brief. This is a short description of the
                todo item. It explains the task in brief. This is a short
                description of the todo item. It explains the task in brief.
                This is a short description of the todo item. It explains the
                task in brief.
              </p>
            </div>
          </div>
          {/* <!-- Todo Card 1 --> */}
          <div className="flex items-center space-x-3 ">
            {/* <!-- Block on the left side --> */}
            <div className="w-8 h-[88px] bg-white/10  rounded-lg  flex justify-center items-center flex-col">
              <div className="hover:bg-white/20 flex w-8 h-8 rounded-t-lg items-center justify-center">
                <button className="text-white hover:text-green-600 transition p-1 ">
                  <MdOutlineDoneAll size={16} />
                </button>
              </div>

              <div className="hover:bg-white/20 flex w-8 h-8 items-center justify-center">
                <button className="text-white hover:text-yellow-400 transition p-1">
                  <FaEdit size={14} />
                </button>
              </div>

              <div className="hover:bg-white/20 rounded-b-lg flex w-8 h-8 items-center justify-center">
                <button className="text-white hover:text-red-400 transition p-1">
                  <MdDeleteForever size={16} />
                </button>
              </div>
            </div>
            <div className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition space-y-2 flex-grow shadow-lg shadow-todoPal">
              {/* <!-- Todo Title and Info --> */}
              <div className="flex justify-between items-center">
                <span className="text-white text-xl font-semibold">
                  Todo Title 1
                </span>
                <div className="flex space-x-3">
                  {/* Todo Card ID */}
                  <span className="text-sm text-gray-500">
                    2024.06.06 19:33
                  </span>
                  <span className="text-sm text-gray-500">#4</span>
                </div>
              </div>
              {/* <!-- Todo Description --> */}
              <p className="text-gray-300 text-sm drop-shadow-lg">
                This is a short description of the todo item. It explains the
                task in brief. This is a short description of the todo item. It
                explains the task in brief. This is a short description of the
                todo item. It explains the task in brief. This is a short
                description of the todo item. It explains the task in brief.
                This is a short description of the todo item. It explains the
                task in brief. This is a short description of the todo item. It
                explains the task in brief.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoContent;
