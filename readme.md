**1-Day React Coding Roadmap (Hour-by-Hour)** to *master the basics by writing code with your own hands* — no videos, just pure coding and understanding.

---

# 🧠 **1-Day React Coding Roadmap — “From Zero to Strong Beginner”**

> ⚙️ Total Time: ~10–12 hours
> 📍 Goal: Understand React’s core concepts, build a small app, and feel confident reading any React code.

---

## 🕐 **Hour 1 — Setup & Hello React**

**Concepts:**

* What React is
* Creating a project
* Folder structure
* JSX basics

**Tasks:**

1. Run:

   ```bash
   npx create-react-app react-practice
   cd react-practice
   npm start
   ```
2. Open in VS Code → `App.js`
3. Delete all code, then type:

   ```jsx
   function App() {
     return (
       <div>
         <h1>Hello React 👋</h1>
       </div>
     );
   }
   export default App;
   ```
4. Change text and re-save → understand *auto-refresh & JSX*.

---

## 🕑 **Hour 2 — Components**

**Concepts:**

* Component = a function returning JSX
* Importing & exporting

**Tasks:**

1. Create `Header.js`:

   ```jsx
   function Header() {
     return <h2>My React Header</h2>;
   }
   export default Header;
   ```
2. Use it inside `App.js`:

   ```jsx
   import Header from "./Header";
   function App() {
     return (
       <div>
         <Header />
         <p>App Body</p>
       </div>
     );
   }
   ```
3. Add more components (e.g., `Footer.js`) and import them.

✅ Understand: components are reusable like functions.

---

## 🕒 **Hour 3 — Props**

**Concepts:**

* Passing data from parent → child

**Tasks:**

1. Update `Header.js`:

   ```jsx
   function Header(props) {
     return <h2>Welcome, {props.name}</h2>;
   }
   export default Header;
   ```
2. Pass props in `App.js`:

   ```jsx
   <Header name="Altaseb" />
   ```
3. Add another prop:

   ```jsx
   <Header name="React Student" />
   ```

✅ Understand: props are *read-only* data.

---

## 🕓 **Hour 4–5 — State & Events**

**Concepts:**

* Dynamic data with `useState`
* Handling events

**Tasks:**

1. Create a Counter App:

   ```jsx
   import { useState } from "react";

   function App() {
     const [count, setCount] = useState(0);
     return (
       <div>
         <h2>Counter: {count}</h2>
         <button onClick={() => setCount(count + 1)}>+</button>
         <button onClick={() => setCount(count - 1)}>-</button>
       </div>
     );
   }

   export default App;
   ```
2. Add a reset button.

✅ Understand: `useState` = data that changes → re-renders UI.

---

## 🕔 **Hour 6 — Conditional Rendering**

**Concepts:**

* Render different UI based on conditions

**Tasks:**

```jsx
const [isLoggedIn, setIsLoggedIn] = useState(false);

return (
  <div>
    {isLoggedIn ? <h2>Welcome back!</h2> : <h2>Please log in</h2>}
    <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
      {isLoggedIn ? "Logout" : "Login"}
    </button>
  </div>
);
```

✅ Understand: use ternary `? :` for logic inside JSX.

---

## 🕕 **Hour 7–8 — useEffect & API Fetching**

**Concepts:**

* Side effects (fetch, timers, etc.)
* useEffect dependency array

**Tasks:**

```jsx
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h2>User List</h2>
      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}

export default App;
```

✅ Understand: `useEffect` runs after the component renders.

---

## 🕖 **Hour 9 — Forms & Controlled Inputs**

**Concepts:**

* Managing input fields
* Preventing default behavior

**Tasks:**

```jsx
import { useState } from "react";

function App() {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Hello, ${name}!`);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <button>Say Hello</button>
    </form>
  );
}

export default App;
```

✅ Understand: input value always comes from `state`.

---

## 🕗 **Hour 10–11 — Mini Project: Todo App**

**Concepts:**

* Combine everything (state, props, lists, events)

**Tasks:**

```jsx
import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    setTodos([...todos, task]);
    setTask("");
  };

  const deleteTodo = (i) => {
    setTodos(todos.filter((_, index) => index !== i));
  };

  return (
    <div>
      <h2>Todo App</h2>
      <form onSubmit={addTodo}>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add task"
        />
        <button>Add</button>
      </form>

      <ul>
        {todos.map((t, i) => (
          <li key={i}>
            {t} <button onClick={() => deleteTodo(i)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

✅ You just built a full React app.

---

## 🕘 **Hour 12 — Component Split & Wrap-Up**

**Concepts:**

* Clean structure
* Export/import multiple components

**Tasks:**

1. Move your todo list to `TodoList.js`:

   ```jsx
   function TodoList({ todos, deleteTodo }) {
     return (
       <ul>
         {todos.map((t, i) => (
           <li key={i}>
             {t} <button onClick={() => deleteTodo(i)}>❌</button>
           </li>
         ))}
       </ul>
     );
   }
   export default TodoList;
   ```
2. Import it in `App.js`:

   ```jsx
   import TodoList from "./TodoList";
   ```
3. Add simple CSS styles in `App.css`.

✅ You now understand React structure, logic, and styling.

---

# 🎯 Final Achievement

By the end of this 1-day plan, you’ll have:

* ✅ A full **Todo App**
* ✅ Mastered `useState`, `useEffect`, props, events, JSX
* ✅ Confidence to read and build small React apps
* ✅ Strong base for learning **React Router, Context API, and Redux**

---


