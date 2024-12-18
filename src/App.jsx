import { Plus } from "lucide-react";
import Todos from "./components/Todos";
import { useEffect, useState } from "react";
import styles from "./app.module.css";

export default function App() {
  const todosFromLs = JSON.parse(localStorage.getItem("todos")) || [];

  const [todos, setTodos] = useState(todosFromLs);
  const [todo, setTodo] = useState("");

  const pendingTodos = todos.filter((todo) => !todo.isCompleted);
  const completedTodos = todos.filter((todo) => todo.isCompleted);

  function handleAddTodo(e) {
    e.preventDefault();
    setTodos((prev) => [
      { id: Date.now(), name: todo, isCompleted: false },
      ...prev,
    ]);
    setTodo("");
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>ChekerX</h3>
      </div>
      <div className={styles.maxWidth}>
        <form className={styles.inputContainer} onSubmit={handleAddTodo}>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Add a todo"
          />
          <button type="submit">
            <Plus />
          </button>
        </form>

        {todos.length > 0 ? (
          <>
            <Todos todos={pendingTodos} setTodos={setTodos} title="Pending" />
            <Todos
              todos={completedTodos}
              setTodos={setTodos}
              title="Completed"
            />
          </>
        ) : (
          <div style={{ marginTop: "2rem" }} className={styles.nothingFound}>
            Nothing found!
          </div>
        )}
      </div>
    </div>
  );
}
