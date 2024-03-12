import React, { useState } from "react";
import { useTodo } from "../context/TodoContext";

const InputBox = () => {
  const [item, setItem] = useState("");

  const { handleAddTodos, dispatch } = useTodo();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (item === "") return;

    handleAddTodos(item);
    setItem("");
  };

  return (
    <form className="input-group input-group-lg" onSubmit={handleSubmit}>
      <div className="input-group-text">
        <input
          onChange={() =>
            dispatch({
              type: "todos/allToggle",
            })
          }
          className="form-check-input mt-0"
          type="checkbox"
        />
      </div>
      <input
        value={item}
        type="text"
        className="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-lg"
        onChange={(e) => setItem(e.target.value)}
      />
    </form>
  );
};

export default InputBox;
