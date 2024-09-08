import React from "react";
import { RiSearch2Line } from "react-icons/ri";

const SearchTodo = () => {
  return (
    <div className="flex space-x-1 ">
      <button className="mx-auto items-center flex justify-center w-10 h-8 rounded-l-full  bg-gray-100/10 hover:bg-gray-500/10">
        <RiSearch2Line className="text-gray-400" />
      </button>
      <input
        type="number"
        className="w-[454px] max-w-lg h-8 p-3 bg-gray-100/10 text-white rounded-r-full focus:outline-none focus:ring-1 focus:ring-todoPal placeholder-gray-400 "
        placeholder="Search Todo by #ID..."
      />
    </div>
  );
};

export default SearchTodo;
