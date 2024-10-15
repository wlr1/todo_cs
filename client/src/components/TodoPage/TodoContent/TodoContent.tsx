import { useEffect, useState } from "react";
import { AppDispatch } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { fetchTodos } from "../../../redux/slices/todoSlice/asyncActions";

import TodoList from "./TodoList/TodoList";
import TodoToolbar from "./TodoToolbar/TodoToolbar";

const TodoContent = () => {
  const [isFormAnimation, setIsFormAnimation] = useState(false);
  const [searchId, setSearchId] = useState<number | null>(null);

  const dispatch: AppDispatch = useDispatch();

  const fetchAllTodos = () => dispatch(fetchTodos());

  useEffect(() => {
    setIsFormAnimation(!isFormAnimation);
  }, []);

  return (
    <div className="flex h-full relative  ">
      <div className="rounded-r-lg shadow-custom shadow-gray-950 overflow-hidden w-full ">
        <div
          className={`animate__animated animate__slow ${
            isFormAnimation ? "animate__fadeIn" : ""
          }`}
        >
          {/* Todo add btn and search bar */}
          <div className="">
            <TodoToolbar
              setSearchId={setSearchId}
              fetchAllTodos={fetchAllTodos}
            />
          </div>

          {/* Todo list */}
          <div className="overflow-y-scroll max-h-[75vh] custom-scrollbar">
            <TodoList searchId={searchId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoContent;
