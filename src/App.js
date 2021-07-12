import React, { useState, useReducer } from "react";
import "./App.css";

import Header from "./Components/Header";

const reducer = (state, action) => {
  switch (action.type) {
    case "addTodo":
      return {
        todos: [
          ...state.todos,
          { key: Math.random(), title: action.enteredTitle, completed: false },
        ],
      };

    case "toggleTodo":
      return {
        todos: state.todos.map((text, index) =>
          index === action.index
            ? { ...text, completed: !text.completed }
            : text
        ),
        todoCount: state.todoCount,
      };

    default:
      return state.todos;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, { todos: [] });

  const [enteredTitle, setEnteredTitle] = useState("");

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    dispatch({ type: "addTodo", enteredTitle });
    setEnteredTitle("");
  };

  return (
    <div className="App">
      <Header />
      <form onSubmit={formSubmitHandler}>
        <label htmlFor="title">Title</label>
        <input
          value={enteredTitle}
          id="title"
          type="text"
          onChange={titleChangeHandler}
        />
      </form>

      {state.todos.map((todo, index) => (
        <div
          className="todo"
          key={todo.key}
          onClick={() => dispatch({ type: "toggleTodo", index })}
          style={{ textDecoration: todo.completed ? "line-through" : " " }}
        >
          <h2>{todo.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default App;
