import React, { useState } from "react";
import TodoItem from "../TodoItem/TodoItem";

import { AppDispatch, RootState } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { updateTodoOrder } from "../../../../redux/slices/todoSlice/asyncActions";

import { SearchByIdTodoListProps } from "../../../../utility/types/types";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

const TodoList: React.FC<SearchByIdTodoListProps> = ({ searchId }) => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch: AppDispatch = useDispatch();

  const [activeId, setActiveId] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as number | null);
  };

  //dnd event
  const handleDragEnd = (event: DragEndEvent) => {
    // Extract 'active' (the item being dragged) and 'over' (the drop target) from the event
    const { active, over } = event;
    // If there's no drop target or the active item's ID matches the drop target's ID, exit the function
    if (!over || active.id === over.id) return;

    // Find the old index based on the active todo ID
    const oldIndex = todos.findIndex((todo) => todo.id === active.id);
    // Find the new index based on the over todo ID
    const newIndex = todos.findIndex((todo) => todo.id === over.id);

    // Check if both old and new indices are valid (not -1)
    if (oldIndex !== -1 && newIndex !== -1) {
      // Create a new order array by moving the item from the old index to the new index
      const newOrder = arrayMove(todos, oldIndex, newIndex);

      dispatch(
        updateTodoOrder(newOrder.map((todo, idx) => ({ ...todo, order: idx })))
      );
    }
  };

  //search todo
  const filteredTodos = searchId
    ? todos.filter((todo) => todo.id === searchId)
    : todos;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <SortableContext items={todos.map((todo) => todo.id)}>
        <div className="space-y-4 w-[88%] mx-auto">
          {todos.length > 0 ? (
            filteredTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
          ) : (
            <div className="flex items-center justify-center bg-transparent text-white h-24">
              <p className="text-base text-gray-400 font-light italic tracking-wide">
                Todo with this ID does not exist!
              </p>
            </div>
          )}
        </div>

        <DragOverlay>
          {activeId ? (
            <div className="shadow-lg bg-white/10 p-4 rounded-lg w-[55%] absolute">
              <TodoItem todo={todos.find((todo) => todo.id === activeId)!} />
            </div>
          ) : null}
        </DragOverlay>
      </SortableContext>
    </DndContext>
  );
};

export default TodoList;
