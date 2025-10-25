# ⚛️ **Next.js 3-Day Master Plan (Hands-On Learning)**

Each day builds directly on what you did before, so by the end, you’ll have **3 working projects** and strong practical knowledge.

---

## 🗓️ **Day 1 — Next.js Core Concepts & Routing**

### 🎯 Goal:

Understand how Next.js works and build your first multi-page app.

### 📚 Learn by Coding:

1. **Create a new project**

   ```bash
   npx create-next-app my-nextjs-journey
   cd my-nextjs-journey
   npm run dev
   ```

2. **Explore folders**

   * `app/page.js` → Home page
   * `app/about/page.js` → About page
   * `app/components/` → for reusable UI components

3. **Create pages**

   ```jsx
   // app/page.js
   import Link from "next/link";

   export default function Home() {
     return (
       <main>
         <h1>Welcome to My Next.js App</h1>
         <Link href="/about">Go to About</Link>
       </main>
     );
   }
   ```

   ```jsx
   // app/about/page.js
   import Link from "next/link";

   export default function About() {
     return (
       <main>
         <h1>About Page</h1>
         <p>This page shows routing in Next.js.</p>
         <Link href="/">Go Home</Link>
       </main>
     );
   }
   ```

4. **Add a reusable Header**

   ```jsx
   // app/components/Header.js
   export default function Header() {
     return <header><h2>My Website Header</h2></header>;
   }
   ```

   Import it in both pages.

---

✅ **Mini Project #1:**
**Portfolio Skeleton**

* Home, About, Contact pages
* Shared Header & Footer
* Use `<Link>` for navigation

🧠 **Concepts mastered:** File-based routing, Components, Layout structure.

---

## 🗓️ **Day 2 — Data Fetching & API Routes**

### 🎯 Goal:

Learn to fetch external data and build backend APIs directly in Next.js.

### 📚 Learn by Coding:

1. **Server-side data fetching**

   ```jsx
   // app/users/page.js
   export default async function Users() {
     const res = await fetch("https://jsonplaceholder.typicode.com/users");
     const users = await res.json();

     return (
       <main>
         <h1>User List</h1>
         <ul>
           {users.map((u) => (
             <li key={u.id}>{u.name}</li>
           ))}
         </ul>
       </main>
     );
   }
   ```

2. **API route (your own backend)**

   ```js
   // app/api/hello/route.js
   export async function GET() {
     return Response.json({ message: "Hello from Next.js backend!" });
   }
   ```

   Test at: `http://localhost:3000/api/hello`

3. **Client-side fetching with useEffect**

   ```jsx
   "use client";
   import { useState, useEffect } from "react";

   export default function ClientFetch() {
     const [data, setData] = useState([]);

     useEffect(() => {
       fetch("/api/hello")
         .then((res) => res.json())
         .then((data) => setData(data.message));
     }, []);

     return <h2>{data}</h2>;
   }
   ```

---

✅ **Mini Project #2:**
**Next.js User Directory**

* Fetch users from API
* Display in cards
* Add your own `/api/users` backend route

🧠 **Concepts mastered:** Server components, Client components, API routes, Data fetching.

---

## 🗓️ **Day 3 — Forms, State & Deployment**

### 🎯 Goal:

Add interactivity, manage form input, and deploy online.

### 📚 Learn by Coding:

1. **Client-side form**

   ```jsx
   "use client";
   import { useState } from "react";

   export default function ContactForm() {
     const [name, setName] = useState("");
     const [submitted, setSubmitted] = useState(false);

     const handleSubmit = (e) => {
       e.preventDefault();
       setSubmitted(true);
     };

     return (
       <form onSubmit={handleSubmit}>
         <input
           type="text"
           placeholder="Enter name"
           value={name}
           onChange={(e) => setName(e.target.value)}
         />
         <button type="submit">Send</button>

         {submitted && <p>Thanks, {name}!</p>}
       </form>
     );
   }
   ```

2. **Combine everything into one app**

   * Home page → introduction
   * Users page → fetched users
   * Contact page → form
   * API → `/api/hello`

3. **Styling**
   Install Tailwind CSS (optional but fast):

   ```bash
   npx tailwindcss init -p
   ```

   Add:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. **Deploy**

   * Push project to GitHub
   * Go to [https://vercel.com](https://vercel.com) → Import GitHub project → Deploy ✅

---

✅ **Mini Project #3:**
**Full “Next.js Info App”**

* 3 pages (Home, Users, Contact)
* Form input + API fetching
* Deployed to Vercel

🧠 **Concepts mastered:** State, Events, Forms, Styling, Deployment.

---

## 🚀 **After 3 Days You’ll Know**

✅ React fundamentals in a framework
✅ Server & Client components
✅ Data fetching (SSR & client)
✅ API routes
✅ Layout, routing, styling
✅ Full app deployment to production

---

