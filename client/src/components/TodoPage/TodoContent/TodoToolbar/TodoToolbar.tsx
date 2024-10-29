import React, { lazy, Suspense } from "react";
import SearchTodo from "./SearchTodo/SearchTodo";
import { SearchByIdProps } from "../../../../utility/types/types";

const AddTodoBtn = lazy(() => import("./AddTodoButton/AddTodoBtn"));

const TodoToolbar: React.FC<SearchByIdProps> = ({ setSearchId }) => {
  return (
    <div className="flex relative justify-center items-center mt-6 mb-6 w-full ">
      <Suspense fallback={<div>Loading...</div>}>
        <AddTodoBtn />
      </Suspense>

      <SearchTodo setSearchId={setSearchId} />
    </div>
  );
};

export default TodoToolbar;
