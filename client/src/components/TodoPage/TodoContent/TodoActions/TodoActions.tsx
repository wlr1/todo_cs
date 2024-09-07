import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever, MdOutlineDoneAll } from "react-icons/md";

const TodoActions = () => {
  return (
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
  );
};

export default TodoActions;
