import React, { createContext, useContext, useReducer } from "react";

const TodoContext = createContext();

const initialState = {
  todos: [
    { id: 1, title: "Todos", completed: true },
    { id: 2, title: "Buy groceries", completed: false },
    { id: 3, title: "Todos 2", completed: false },
    { id: 4, title: "Buy groceries 2", completed: true },
  ],
  activeTab: "All",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "todos/create":
      const newList = {
        title: action.payload,
        completed: false,
        id: Math.random().toString(16),
      };
      return {
        ...state,
        todos: [...state.todos, newList],
      };

    case "todos/delete":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case "todos/clearAllCompleted":
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      };

    case "todos/toggle":
      return {
        ...state,
        todos: state.todos.map((task) => {
          if (task.id === action.payload) {
            return { ...task, completed: !task.completed };
          }
          return task;
        }),
      };

    case "todos/allToggle":
      const areAllCompleted = state.todos.every((todo) => todo.completed);
      return {
        ...state,
        todos: state.todos.map((todo) => ({
          ...todo,
          completed: !areAllCompleted,
        })),
      };

    case "todos/reordered":
      return {
        ...state,
        todos: action.payload,
      };

    case "set/activeTap":
      return {
        ...state,
        activeTab: action.payload,
      };
    default:
      return state;
  }
};

const TodoContextProvider = ({ children }) => {
  const [{ todos, activeTab }, dispatch] = useReducer(reducer, initialState);

  //filter todos for active, all and completed task
  const filteredTodos = todos.filter((todo) => {
    if (activeTab === "All") return true;
    if (activeTab === "Active") return !todo.completed;
    if (activeTab === "Completed") return todo.completed;
    return true;
  });

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(filteredTodos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch({
      type: "todos/reordered",
      payload: items,
    });
  };

  //function to delete to todos
  const handleDeleteTask = (id) => {
    dispatch({
      type: "todos/delete",
      payload: id,
    });
  };

  //function to clear all todo list
  const handleClearAllCompleted = () => {
    dispatch({
      type: "todos/clearAllCompleted",
    });
  };

  //function to toggle completed todo list
  const handleToggleComplete = (todoId) => {
    dispatch({
      type: "todos/toggle",
      payload: todoId,
    });
  };

  //function to add new tasks to the list
  const handleAddTodos = (title) => {
    dispatch({
      type: "todos/create",
      payload: title,
    });
  };

  return (
    <TodoContext.Provider
      value={{
        filteredTodos,
        activeTab,
        handleDeleteTask,
        handleClearAllCompleted,
        handleToggleComplete,
        handleAddTodos,
        dispatch,
        todos,
        handleDragEnd,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

const useTodo = () => {
  const context = useContext(TodoContext);
  return context;
};
export { useTodo };
export default TodoContextProvider;
