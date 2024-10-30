import { useEffect, useState } from "react";

import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../../../redux/slices/todoSlice/asyncActions";

import TodoList from "./TodoList/TodoList";
import TodoToolbar from "./TodoToolbar/TodoToolbar";

const TodoContent = () => {
  const [isFormAnimation, setIsFormAnimation] = useState(false);
  const [searchId, setSearchId] = useState<number | null>(null);

  const { todos } = useSelector((state: RootState) => state.todos);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (todos.length === 0) {
      dispatch(fetchTodos());
    }
  }, [dispatch, todos.length]);

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
          <>
            <TodoToolbar setSearchId={setSearchId} />
          </>
          {/* Todo list */}{" "}
          <div className="overflow-y-scroll max-h-[75vh] custom-scrollbar">
            <TodoList searchId={searchId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoContent;
