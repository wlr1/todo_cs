import React, { useCallback, useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { SearchByIdProps } from "../../../../../utility/types/types";

const SearchTodo: React.FC<SearchByIdProps> = ({
  setSearchId,
  fetchAllTodos,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = useCallback(() => {
    const id = parseInt(inputValue);
    if (inputValue.trim() === "") {
      fetchAllTodos(); //if search bar is empty, fetch all todos
      setSearchId(null); //search id null
    } else {
      setSearchId(isNaN(id) ? null : id);
    }
  }, [inputValue, fetchAllTodos, setSearchId]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    if (inputValue.trim() === "") {
      fetchAllTodos();
      setSearchId(null);
    }
  }, [inputValue, fetchAllTodos, setSearchId]);

  return (
    <div className="flex space-x-1 ">
      <button
        onClick={handleSearch}
        className="mx-auto flex items-center justify-center w-10 h-8 rounded-l-full  bg-gray-100/10 "
      >
        <RiSearch2Line className="text-gray-400" />
      </button>
      <input
        value={inputValue}
        type="number"
        className="w-[454px] max-w-lg h-8 p-3 bg-gray-100/10 text-white rounded-r-full focus:outline-none focus:ring-1 focus:ring-todoPal placeholder-gray-400 "
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search Todo by #ID..."
      />
    </div>
  );
};

export default SearchTodo;
