import React from "react";
import { FaEdit } from "react-icons/fa";

import { LuPlus } from "react-icons/lu";
import { MdDeleteForever } from "react-icons/md";

const TodoContent = () => {
  return (
    <div className="flex h-full relative">
      <div className="bg-bgTodoBlock bg-no-repeat bg-cover  w-full rounded-r-lg shadow-custom shadow-gray-700 overflow-hidden">
        <div
          className="absolute inset-0 bg-opacity-50 backdrop-blur-md rounded-r-lg "
          style={{ backdropFilter: "blur(11px)" }}
        >
          {/* <!-- Add Todo Button --> */}
          <div className="flex justify-end m-4">
            <button className="bg-white/10 text-white p-3 rounded-full hover:bg-white/20 transition">
              <LuPlus size={21} color="lightgreen" />
            </button>
          </div>

          {/* <!-- Todo Card 1 --> */}
          <div className="space-y-4 w-[86%] mx-auto  ">
            <div className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition space-y-2">
              {/* <!-- Todo Title and Edit Button --> */}
              <div className="flex justify-between items-center">
                <span className="text-white text-xl font-semibold">
                  Todo Title 1
                </span>
                <div className="flex space-x-3">
                  <button className="text-white hover:text-red-400 transition">
                    <MdDeleteForever size={16} />
                  </button>
                  <button className="text-white hover:text-green-600 transition">
                    <FaEdit size={15} />
                  </button>
                </div>
              </div>
              {/* <!-- Todo Description --> */}
              <p className="text-gray-300 text-sm drop-shadow-lg">
                This is a short description of the todo item. It explains the
                task in brief.
              </p>
            </div>

            {/* <!-- Todo Card 2 --> */}
            <div className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition space-y-2 ">
              {/* <!-- Todo Title and Edit Button --> */}
              <div className="flex justify-between items-center">
                <span className="text-white text-xl font-semibold">
                  Todo Title 2
                </span>
                <div className="flex space-x-3">
                  <button className="text-white hover:text-red-400 transition">
                    <MdDeleteForever size={16} />
                  </button>
                  <button className="text-white hover:text-green-600 transition">
                    <FaEdit size={15} />
                  </button>
                </div>
              </div>
              {/* <!-- Todo Description --> */}
              <p className="text-gray-300 text-sm drop-shadow-lg">
                This is another description of a todo item. It gives a bit more
                detail. This is another description of a todo item. It gives a
                bit more detail. This is another description of a todo item. It
                gives a bit more detail. This is another description of a todo
                item. It gives a bit more detail. This is another description of
                a todo item. It gives a bit more detail.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoContent;
