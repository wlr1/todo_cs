import React from "react";
import TodoItem from "../TodoItem/TodoItem";
import { AppDispatch, RootState } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";

import { SearchByIdTodoListProps } from "../../../../utility/types/types";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { reorderTodos } from "../../../../redux/slices/todoSlice/todoSlice";

const TodoList: React.FC<SearchByIdTodoListProps> = ({ searchId }) => {
  const { todos } = useSelector((state: RootState) => state.todos);

  const dispatch: AppDispatch = useDispatch();

  const filteredTodos = searchId
    ? todos.filter((todo) => todo.id === searchId)
    : todos;

  //react dnd
  const moveTodo = (dragIndex: number, hoverIndex: number) => {
    const updatedTodos = [...todos];
    const [draggedTodo] = updatedTodos.splice(dragIndex, 1);
    updatedTodos.splice(hoverIndex, 0, draggedTodo);

    dispatch(reorderTodos(updatedTodos));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-4 w-[88%] mx-auto  ">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo, idx) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              index={idx}
              moveTodo={moveTodo}
            />
          ))
        ) : (
          <div className="flex items-center justify-center bg-transparent text-white h-24">
            <p className="text-base text-gray-400 font-light italic tracking-wide">
              Todo with this ID does not exist!
            </p>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default TodoList;
