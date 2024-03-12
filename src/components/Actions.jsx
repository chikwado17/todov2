import React from "react";
import { useTodo } from "../context/TodoContext";

const Actions = () => {
  const { dispatch, filteredTodos, todos, handleClearAllCompleted, activeTab } =
    useTodo();

  //   const activeTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <li className="list-group-item list-lastItem">
      <span>{activeTab === "All" ? filteredTodos.length + " todos" : ""}</span>
      <span>
        {activeTab === "Active" ? filteredTodos.length + " todos active" : ""}
      </span>
      <span>
        {activeTab === "Completed"
          ? filteredTodos.length + " todos completed"
          : ""}
      </span>

      <span
        className={`tabItem ${activeTab === "All" ? "active" : ""}`}
        onClick={() =>
          dispatch({
            type: "set/activeTap",
            payload: "All",
          })
        }
      >
        All
      </span>
      <span
        className={`tabItem ${activeTab === "Active" ? "active" : ""}`}
        onClick={() =>
          dispatch({
            type: "set/activeTap",
            payload: "Active",
          })
        }
      >
        Active
      </span>
      <span
        className={`tabItem ${activeTab === "Completed" ? "active" : ""}`}
        onClick={() =>
          dispatch({
            type: "set/activeTap",
            payload: "Completed",
          })
        }
      >
        Completed
      </span>
      <span className="tabItem" onClick={handleClearAllCompleted}>
        Clear Completed
      </span>
    </li>
  );
};

export default Actions;
