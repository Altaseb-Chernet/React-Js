
# ⚛️ **Next.js Deep Practice with Real Code (Frontend + Backend)**

Let’s start coding 💻 step by step.

---

## 🧩 **1. Project Setup**

```bash
npx create-next-app@latest nextjs-practice
cd nextjs-practice
npm run dev
```

✅ Visit `http://localhost:3000` — default Next.js app runs.

---

## 🧱 **2. Basic Routing (File-Based)**

Every folder under `app/` becomes a route automatically.

📁 **app/page.js**

```jsx
export default function Home() {
  return (
    <main>
      <h1>Welcome Home 🏠</h1>
      <p>This is rendered from app/page.js</p>
    </main>
  );
}
```

📁 **app/about/page.js**

```jsx
export default function About() {
  return (
    <main>
      <h1>About Page</h1>
      <p>This is the about route (app/about/page.js)</p>
    </main>
  );
}
```

📁 **app/contact/page.js**

```jsx
export default function Contact() {
  return (
    <main>
      <h1>Contact Page</h1>
      <p>Let's get in touch!</p>
    </main>
  );
}
```

✅ Visit `/`, `/about`, `/contact` — no React Router needed.

---

## 🧭 **3. Navigation (Link Component)**

📁 **app/components/Navbar.js**

```jsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "1rem" }}>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}
```

📁 **app/layout.js**

```jsx
import Navbar from "./components/Navbar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <hr />
        {children}
      </body>
    </html>
  );
}
```

✅ Navbar now appears on all pages (shared layout).

---

## ⚙️ **4. Server-Side Data Fetching (SSR)**

📁 **app/users/page.js**

```jsx
export default async function Users() {
  // Fetching data on the server
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store", // ensures fresh data (SSR)
  });
  const users = await res.json();

  return (
    <main>
      <h1>Users List</h1>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </main>
  );
}
```

✅ `cache: "no-store"` → **Server-Side Rendering (SSR)**.

---

## 💾 **5. Client-Side Component with State**

📁 **app/counter/page.js**

```jsx
"use client";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <h1>Counter App</h1>
      <h2>{count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </main>
  );
}
```

✅ `"use client"` → allows use of `useState`, `useEffect`, and event handling.

---

## 🧠 **6. Dynamic Routes**

📁 **app/blog/[id]/page.js**

```jsx
export default function BlogPost({ params }) {
  return (
    <main>
      <h1>Blog Post ID: {params.id}</h1>
      <p>This route is dynamic — /blog/1, /blog/2, etc.</p>
    </main>
  );
}
```

✅ Go to `/blog/5` → it shows “Blog Post ID: 5”.

---

## 🌐 **7. API Routes (Backend Inside Next.js)**

📁 **app/api/hello/route.js**

```js
export async function GET() {
  return Response.json({ message: "Hello from Next.js API 🚀" });
}

export async function POST(req) {
  const data = await req.json();
  return Response.json({ received: data });
}
```

✅ Test:

* GET → `/api/hello`
* POST (via Postman or fetch) → sends JSON data

---

## 🧩 **8. Connect Frontend with Backend API**

📁 **app/api-demo/page.js**

```jsx
"use client";
import { useState, useEffect } from "react";

export default function ApiDemo() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <main>
      <h1>API Demo</h1>
      <p>{message}</p>
    </main>
  );
}
```

✅ Fetches data from your **own API route**.

---

## 🧮 **9. Simple Form Submission (Frontend → API)**

📁 **app/contact/page.js**

```jsx
"use client";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", message: "" });
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setResponse(data.status);
  };

  return (
    <main>
      <h1>Contact Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
        <button type="submit">Send</button>
      </form>
      {response && <p>{response}</p>}
    </main>
  );
}
```

📁 **app/api/contact/route.js**

```js
export async function POST(req) {
  const body = await req.json();
  console.log("Form submitted:", body);
  return Response.json({ status: `Thanks ${body.name}, message received!` });
}
```

✅ You just built a **full frontend + backend form**!

---

## 💽 **10. Database Integration with Prisma (SQLite Example)**

### Step 1 — Install and setup

```bash
npm install prisma --save-dev
npx prisma init
```

Edit **prisma/schema.prisma**

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model Note {
  id    Int     @id @default(autoincrement())
  title String
  body  String
}
```

Run migration:

```bash
npx prisma migrate dev --name init
```

---

### Step 2 — Create API routes for CRUD

📁 **app/api/notes/route.js**

```js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const notes = await prisma.note.findMany();
  return Response.json(notes);
}

export async function POST(req) {
  const data = await req.json();
  const note = await prisma.note.create({ data });
  return Response.json(note);
}
```

---

### Step 3 — Frontend to display & add notes

📁 **app/notes/page.js**

```jsx
"use client";
import { useState, useEffect } from "react";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", body: "" });

  async function loadNotes() {
    const res = await fetch("/api/notes");
    setNotes(await res.json());
  }

  useEffect(() => {
    loadNotes();
  }, []);

  const addNote = async (e) => {
    e.preventDefault();
    await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify(form),
    });
    setForm({ title: "", body: "" });
    loadNotes();
  };

  return (
    <main>
      <h1>My Notes</h1>
      <form onSubmit={addNote}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Body"
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
        />
        <button>Add Note</button>
      </form>

      <ul>
        {notes.map((n) => (
          <li key={n.id}>
            <strong>{n.title}</strong>: {n.body}
          </li>
        ))}
      </ul>
    </main>
  );
}
```

✅ You now have:

* Frontend form with state
* Backend API
* Database storage
  All **inside one Next.js app** 🎯

---

## 🔐 **11. Authentication (NextAuth.js — Concept Only Example)**

Install:

```bash
npm install next-auth
```

📁 **app/api/auth/[...nextauth]/route.js**

```js
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials.username === "admin" && credentials.password === "1234") {
          return { id: 1, name: "Admin User" };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
```

✅ Use `useSession()` to protect pages later.

---

## 🧠 **12. Middleware for Protected Routes**

📁 **middleware.js**

```js
import { NextResponse } from "next/server";

export function middleware(req) {
  const loggedIn = false; // Example
  if (!loggedIn && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
```

✅ Auto-redirects users if they’re not logged in.

---

## 🚀 **13. Deployment**

1. Push project to GitHub
2. Go to [https://vercel.com](https://vercel.com) → Import Project
3. Click **Deploy** → Done 🎉

---

## 💎 Summary — You’ve Practiced

✅ File-based routing
✅ Dynamic routes
✅ Server + client components
✅ SSR, CSR
✅ API routes
✅ Forms
✅ Prisma database
✅ Authentication (NextAuth)
✅ Middleware
✅ Deployment

---


