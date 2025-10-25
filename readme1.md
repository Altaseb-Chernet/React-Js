 **Day 1 (React Basics)** by hand-coding everything, you’ll be ready for **Day 2 (Advanced React)** where you’ll go beyond just components and into **real-world app features** — routing, state sharing, persistence, and cleaner architecture.

---

# ⚛️ **Day 2 — Advanced React Roadmap (Hands-on Coding Plan)**

> 🎯 **Goal:** Build a complete mini web app with pages, shared global state, and saved data.
> 🕒 Duration: ~10–12 hours of hands-on coding (same style — no videos).
> 📍 Prerequisite: You completed Day 1 fully.

---

## 🧩 **Hour 1 — React Project Setup for Day 2**

Start clean:

```bash
npx create-react-app react-advanced
cd react-advanced
npm start
```

Make a simple app structure:

```
src/
 ┣ components/
 ┣ pages/
 ┣ App.js
 ┗ index.js
```

Clean `App.js` and `App.css` for a fresh start.

---

## 🧭 **Hour 2 — React Router (Navigation Between Pages)**

Install React Router:

```bash
npm install react-router-dom
```

**Code Setup:**

```jsx
// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

**App.js**

```jsx
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
```

**pages/Home.js**

```jsx
function Home() {
  return <h2>Welcome to the Home Page</h2>;
}
export default Home;
```

**pages/About.js**

```jsx
function About() {
  return <h2>This is the About Page</h2>;
}
export default About;
```

✅ You now have multiple pages without reloading!

---

## 🧠 **Hour 3–4 — Context API (Global State Management)**

Instead of passing props down many levels, we’ll use **Context**.

### Example: Share a user across all pages

📁 `src/context/UserContext.js`

```jsx
import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState("Altaseb");
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
```

📁 `src/index.js`

```jsx
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

root.render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
);
```

📁 `src/pages/Home.js`

```jsx
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Home() {
  const { user, setUser } = useContext(UserContext);
  return (
    <div>
      <h2>Hello, {user} 👋</h2>
      <button onClick={() => setUser("React Pro")}>Change Name</button>
    </div>
  );
}
export default Home;
```

✅ The `user` value is available on all pages!

---

## ⚙️ **Hour 5–6 — Local Storage (Data Persistence)**

Add persistence so the app remembers data after refresh.

Example: Save user’s theme (dark/light mode)

📁 `src/components/ThemeToggler.js`

```jsx
import { useState, useEffect } from "react";

function ThemeToggler() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.style.backgroundColor =
      theme === "light" ? "white" : "#333";
    document.body.style.color = theme === "light" ? "black" : "white";
  }, [theme]);

  return (
    <div>
      <h3>Current theme: {theme}</h3>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
    </div>
  );
}

export default ThemeToggler;
```

Use it in `App.js`:

```jsx
import ThemeToggler from "./components/ThemeToggler";
...
<ThemeToggler />
```

✅ You now know how to save user preferences locally.

---

## 💾 **Hour 7–8 — Fetch & Display Dynamic API Data (with Loading State)**

Create a data page that shows users fetched from API.

📁 `src/pages/Users.js`

```jsx
import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
}
export default Users;
```

Add a route in `App.js`:

```jsx
<Route path="/users" element={<Users />} />
<Link to="/users">Users</Link>
```

✅ You’ve handled real-world async data.

---

## 🧾 **Hour 9–10 — Mini App Project**

Let’s combine everything into a **React Notes App** with:

* Multiple pages (Home, Notes)
* Context for notes
* Local storage for saving notes

---

### 📁 `src/context/NotesContext.js`

```jsx
import { createContext, useEffect, useState } from "react";

export const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      {children}
    </NotesContext.Provider>
  );
}
```

Wrap it in `index.js`:

```jsx
<UserProvider>
  <NotesProvider>
    <App />
  </NotesProvider>
</UserProvider>
```

---

### 📁 `src/pages/Notes.js`

```jsx
import { useContext, useState } from "react";
import { NotesContext } from "../context/NotesContext";

function Notes() {
  const { notes, setNotes } = useContext(NotesContext);
  const [text, setText] = useState("");

  const addNote = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setNotes([...notes, text]);
    setText("");
  };

  const deleteNote = (i) => {
    setNotes(notes.filter((_, index) => index !== i));
  };

  return (
    <div>
      <h2>Notes App</h2>
      <form onSubmit={addNote}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add note"
        />
        <button>Add</button>
      </form>

      <ul>
        {notes.map((n, i) => (
          <li key={i}>
            {n} <button onClick={() => deleteNote(i)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;
```

Add route in `App.js`:

```jsx
<Route path="/notes" element={<Notes />} />
<Link to="/notes">Notes</Link>
```

✅ Now you’ve built a **multi-page persistent React Notes App**!

---

## 🎯 **Hour 11–12 — Polish & Wrap-Up**

* Add a navigation bar component.
* Add minimal CSS styling (`App.css`).
* Try switching between pages & reloading (data persists).

---

# 🧠 **At the End of Day 2, You’ll Master:**

| Concept              | You Can Do                   |
| -------------------- | ---------------------------- |
| React Router         | Multiple pages (SPA)         |
| Context API          | Global data sharing          |
| Local Storage        | Persistent user data         |
| useEffect            | API calls, side effects      |
| Project Architecture | Organized structure          |
| Real App             | Notes App with full features |

---

✅ **Result:** You now have a complete React skill set ready for:
→ real-world projects,
→ frontend freelance work, or
→ deeper frameworks like **Next.js**.

---

