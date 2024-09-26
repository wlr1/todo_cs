import React from "react";
import SearchTodo from "./SearchTodo/SearchTodo";
import AddTodoBtn from "./AddTodoButton/AddTodoBtn";
import { SearchByIdProps } from "../../../../utility/types/types";

const TodoToolbar: React.FC<SearchByIdProps> = ({
  setSearchId,
  fetchAllTodos,
}) => {
  return (
    <div className="flex relative justify-center items-center mt-6 mb-6 w-full ">
      <AddTodoBtn />

      <SearchTodo setSearchId={setSearchId} fetchAllTodos={fetchAllTodos} />
    </div>
  );
};

export default TodoToolbar;
