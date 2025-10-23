import React from 'react'
import { useState } from 'react'
export default function App() {
  const [count, setCount] = useState(0);

  const increase = () => setCount( count + 1 )
  const decrease = () => {
    if(count >0){
      setCount (count - 1 )
    }
  }
  return (
    <div>
      <h2>counter : {count}</h2>
      <button onClick={increase}>increase</button>
      <button onClick={decrease}>decrease</button>
    </div>
  )
}

