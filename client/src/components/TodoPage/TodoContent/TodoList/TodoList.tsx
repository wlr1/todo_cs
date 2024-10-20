import React from "react";
import TodoItem from "../TodoItem/TodoItem";
import { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";

import { SearchByIdTodoListProps } from "../../../../utility/types/types";

const TodoList: React.FC<SearchByIdTodoListProps> = ({ searchId }) => {
  const { todos } = useSelector((state: RootState) => state.todos);

  const filteredTodos = searchId
    ? todos.filter((todo) => todo.id === searchId)
    : todos;

  return (
    <div className="space-y-4 w-[88%] mx-auto  ">
      {filteredTodos.length > 0 ? (
        filteredTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      ) : (
        <div className="flex items-center justify-center bg-transparent text-white h-24">
          <p className="text-base text-gray-400 font-light italic tracking-wide">
            Todo with this ID does not exist!
          </p>
        </div>
      )}
    </div>
  );
};

export default TodoList;
