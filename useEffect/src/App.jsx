import { useState, useEffect } from 'react'

function App() {
  const [users, setusers] = useState([])
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setusers(data));
  }, []);
  return (
    <>
      <div>
        <h2>users list</h2>
        {users.map((u) => (
          <p key={u.id}>{u.name}</p>
        ))}
      </div>

    </>
  )
}

export default App
