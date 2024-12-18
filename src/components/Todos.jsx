import React from "react";
import styles from "../app.module.css";
import { Trash2 } from "lucide-react";

export default function Todos({ todos, setTodos, title }) {
  function handleToggleTodo(id) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  }

  function handleDeleteTodo(id) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  return (
    <div className={styles.todosSection}>
      <p className={styles.todosTitle}>{title}</p>
      <div className={styles.todosContainer}>
        {todos.length === 0 && (
          <div className={styles.nothingFound}>Nothing found!</div>
        )}
        {todos.map((todo) => {
          return (
            <div
              key={todo.id}
              className={`${styles.todo} ${
                todo.isCompleted ? styles.completedTodo : ""
              }`}
            >
              <span>
                <input
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={() => handleToggleTodo(todo.id)}
                />
                <p>{todo.name}</p>
              </span>
              <button onClick={() => handleDeleteTodo(todo.id)}>
                <Trash2 />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
