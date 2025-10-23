import { useState, useEffect } from 'react'


function App() {
  const [users, setusers] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setusers(data));
  }, []);

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="users">
        <input
          type="text"
          value={search}
          placeholder='search users...'
          onChange={(e) => setSearch(e.target.value)}
        />
        {filteredUsers.map((p) => (
          <p key={p.id}>{p.name}</p>
        ))}
      </div>
    </>
  )
}

export default App
