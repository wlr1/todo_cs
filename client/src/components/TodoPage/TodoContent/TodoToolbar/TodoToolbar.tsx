import React from "react";
import SearchTodo from "./SearchTodo/SearchTodo";
import AddTodoBtn from "./AddTodoButton/AddTodoBtn";
import { SearchByIdProps } from "../../../../utility/types/types";

const TodoToolbar: React.FC<SearchByIdProps> = ({ setSearchId }) => {
  return (
    <div className="flex relative justify-center items-center mt-6 mb-6 w-full ">
      <AddTodoBtn />

      <SearchTodo setSearchId={setSearchId} />
    </div>
  );
};

export default TodoToolbar;
