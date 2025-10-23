import { useState } from 'react'


function App() {
  const [text, setText] = useState("")

  const handlesubmit = (e) => {
    e.preventDefault();
    if(text !=""){
      alert("you typed :" + text);
    }
    setText("");
  }

  return (
    <>
      <form onSubmit={handlesubmit}>
        <input type="text"
          placeholder='type something...'
          value={text}
          onChange={(e) => setText(e.target.value)} />
        <button >submit</button>
      </form>
    </>
  )
}

export default App
