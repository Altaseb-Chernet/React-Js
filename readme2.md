🔥 **learn by building**.
You’ve now mastered the **Frontend side** (React basics + advanced features).
Now it’s time for **Day 3 — React + Backend (Full MERN Integration)**.

This is where you go from just React apps to **real-world fullstack development** 💪

---

# ⚙️ **Day 3 — React + Backend (MERN Integration)**

> 🎯 **Goal:** Build a Full CRUD (Create, Read, Update, Delete) app connected to a real backend using Express + MongoDB.
> 🕒 Duration: ~10–12 hours (code every line yourself).
> 📍 Prerequisites: You’ve completed Day 1 & 2.

---

## 🧱 **Hour 1 — Setup the Fullstack Folder Structure**

Create a new folder:

```
mern-todo/
 ┣ backend/
 ┗ frontend/
```

### 1️⃣ Create React app for frontend:

```bash
cd mern-todo
npx create-react-app frontend
```

### 2️⃣ Initialize Node.js project for backend:

```bash
mkdir backend && cd backend
npm init -y
npm install express mongoose cors nodemon
```

Add a script in `package.json`:

```json
"scripts": {
  "start": "nodemon index.js"
}
```

✅ You’ll now have both client & server environments.

---

## 🖥️ **Hour 2 — Setup Express Server**

📁 `backend/index.js`

```js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB (you can use local or MongoDB Atlas)
mongoose
  .connect("mongodb://127.0.0.1:27017/mern_todo")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Schema and Model
const TodoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});

const Todo = mongoose.model("Todo", TodoSchema);

// Routes
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    completed: false,
  });
  await todo.save();
  res.json(todo);
});

app.put("/todos/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
});

app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
```

✅ Test server:

```bash
npm start
```

Visit 👉 `http://localhost:5000/todos`

---

## ⚛️ **Hour 3–4 — Connect React Frontend with Backend**

Open another terminal:

```bash
cd frontend
npm start
```

📁 `frontend/src/App.js`

```jsx
import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setText("");
  };

  const toggleTodo = async (id) => {
    const res = await fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT",
    });
    const updated = await res.json();
    setTodos(
      todos.map((t) => (t._id === updated._id ? updated : t))
    );
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter((t) => t._id !== id));
  };

  return (
    <div>
      <h2>MERN Todo App</h2>
      <form onSubmit={addTodo}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add todo"
        />
        <button>Add</button>
      </form>

      <ul>
        {todos.map((t) => (
          <li key={t._id}>
            <span
              style={{
                textDecoration: t.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() => toggleTodo(t._id)}
            >
              {t.text}
            </span>
            <button onClick={() => deleteTodo(t._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

✅ Now your React app communicates with Express + MongoDB!

---

## 🧠 **Hour 5–6 — Clean Architecture (Separate Components)**

Organize:

```
frontend/src/
 ┣ components/
 ┃ ┣ TodoList.js
 ┃ ┗ TodoForm.js
 ┣ App.js
```

**TodoForm.js**

```jsx
function TodoForm({ text, setText, addTodo }) {
  return (
    <form onSubmit={addTodo}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add todo"
      />
      <button>Add</button>
    </form>
  );
}

export default TodoForm;
```

**TodoList.js**

```jsx
function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <ul>
      {todos.map((t) => (
        <li key={t._id}>
          <span
            style={{
              textDecoration: t.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
            onClick={() => toggleTodo(t._id)}
          >
            {t.text}
          </span>
          <button onClick={() => deleteTodo(t._id)}>❌</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
```

**App.js**

```jsx
import { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setText("");
  };

  const toggleTodo = async (id) => {
    const res = await fetch(`http://localhost:5000/todos/${id}`, { method: "PUT" });
    const updated = await res.json();
    setTodos(todos.map((t) => (t._id === updated._id ? updated : t)));
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter((t) => t._id !== id));
  };

  return (
    <div>
      <h2>MERN Todo App</h2>
      <TodoForm text={text} setText={setText} addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
```

✅ You’ve now built a fully structured, modular **MERN CRUD app**.

---

## 🧾 **Hour 7–8 — Error Handling + UX**

* Add loading and error states.
* Add a message when no todos exist.
* Show notifications on success or delete.

```jsx
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
  fetch("http://localhost:5000/todos")
    .then((res) => res.json())
    .then((data) => setTodos(data))
    .catch(() => setError("Failed to fetch"))
    .finally(() => setLoading(false));
}, []);
```

✅ You now understand **production-level app handling**.

---

## 🧭 **Hour 9–10 — Deployment Preparation**

### For frontend:

```bash
cd frontend
npm run build
```

### For backend:

Serve React from Express:

```js
const path = require("path");
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});
```

✅ Your full MERN app is ready for deployment on **Render**, **Vercel**, or **Railway**.

---

## 🧰 **Hour 11–12 — Bonus Concepts (Optional)**

Try these next:

* Custom Hooks (`useFetch`, `useLocalStorage`)
* Pagination for long lists
* Search bar for todos
* JWT authentication (login system)

---

# 🎯 **By the End of Day 3: You Will Master**

| Concept           | You Can Do                    |
| ----------------- | ----------------------------- |
| Express + MongoDB | Backend CRUD API              |
| React + Fetch     | Connect frontend with backend |
| Modular React     | Split UI into components      |
| Async Operations  | Handle APIs and errors        |
| Fullstack Logic   | Build & deploy full MERN app  |

✅ You’ve officially gone from **React beginner → Full MERN Developer**.

---

