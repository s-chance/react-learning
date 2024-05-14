import { useState } from 'react'

function Son({ onGetMsg }) {
  const sonMsg = 'this is son msg'
  return (
    <div>
      this is Son
      <button onClick={() => onGetMsg(sonMsg)}>sendMsg</button>
    </div>
  )
}

function App() {

  const [msg, setMsg] = useState('')
  
  const getMsg = (msg) => {
    console.log(msg)
    setMsg(msg)
  }

  return (
    <div>
      this is App, {msg}
      <Son onGetMsg={getMsg} />
    </div>
  )
}

export default App;