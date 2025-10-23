import { useState, useEffect } from 'react';

function App() {
  const [posts, setposts] = useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => setposts(data.slice(0, 10)));
  });

  return (
    <>
      <div>
        <h2>user posts:</h2>
        {posts.map((p) => (
          <div key={p.id}>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
            <hr />
          </div>
        ))}
      </div>
    </>
  );
}
export default App;
