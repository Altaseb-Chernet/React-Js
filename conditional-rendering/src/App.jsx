import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // asc or desc

  // ✅ Add new task
  const addTask = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    setTodos([...todos, task.trim()]);
    setTask("");
  };

  // ✅ Remove task
  const removeTask = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // ✅ Filter & sort tasks
  const filteredTodos = todos
    .filter((t) => t.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.localeCompare(b)
        : b.localeCompare(a)
    );

  // ✅ Toggle sort order
  const toggleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>📝 Todo List</h2>

      {/* Add Task */}
      <form onSubmit={addTask}>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task"
        />
        <button>Add</button>
      </form>

      {/* Search */}
      <input
        style={{ marginTop: "10px", width: "100%" }}
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Sort */}
      <button onClick={toggleSort} style={{ marginTop: "10px" }}>
        Sort: {sortOrder === "asc" ? "A → Z" : "Z → A"}
      </button>

      {/* Tasks List */}
      {filteredTodos.length === 0 ? (
        <p style={{ marginTop: "10px" }}>No tasks found...</p>
      ) : (
        <ul>
          {filteredTodos.map((t, i) => (
            <li key={i}>
              {t} <button onClick={() => removeTask(i)}>❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
