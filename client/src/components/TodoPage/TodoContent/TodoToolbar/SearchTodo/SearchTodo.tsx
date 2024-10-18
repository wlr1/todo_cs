import React, { useCallback, useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { SearchByIdProps } from "../../../../../utility/types/types";
import { AppDispatch } from "../../../../../redux/store";
import { useDispatch } from "react-redux";
import { fetchTodos } from "../../../../../redux/slices/todoSlice/asyncActions";

const SearchTodo: React.FC<SearchByIdProps> = ({ setSearchId }) => {
  const [inputValue, setInputValue] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const handleSearch = useCallback(() => {
    const id = parseInt(inputValue);
    if (inputValue.trim() === "") {
      dispatch(fetchTodos()); //if search bar is empty, fetch all todos
      setSearchId(null); //search id null
    } else {
      setSearchId(isNaN(id) ? null : id);
    }
  }, [dispatch, inputValue, setSearchId]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    if (inputValue.trim() === "") {
      dispatch(fetchTodos());
      setSearchId(null);
    }
  }, [dispatch, inputValue, setSearchId]);

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
