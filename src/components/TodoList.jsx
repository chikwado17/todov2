import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Actions from "./Actions";
import { useTodo } from "../context/TodoContext";

const TodoList = () => {
  const {
    filteredTodos,
    handleDragEnd,
    handleDeleteTask,
    handleToggleComplete,
  } = useTodo();

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <ul
              className="list-group"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {filteredTodos.map((todo, index) => (
                <Draggable
                  key={todo.id}
                  draggableId={todo.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      className="list-group-item"
                    >
                      <input
                        className="form-check-input me-1"
                        type="checkbox"
                        name="listGroupRadio"
                        id="firstRadio"
                        checked={todo.completed}
                        onChange={() => handleToggleComplete(todo.id)}
                      />
                      <label
                        className={`form-check-label ${
                          todo.completed ? "item-checked" : ""
                        }`}
                        htmlFor="firstRadio"
                      >
                        {todo.title}
                      </label>
                      <span
                        onClick={() => handleDeleteTask(todo.id)}
                        className="float-end clearItem"
                      >
                        ❌
                      </span>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      <Actions />
    </>
  );
};

export default TodoList;
