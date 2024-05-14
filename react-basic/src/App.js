// 通过子传父 A -> App
// 通过父传子 App -> B
import { useState } from 'react'

function A({ onGetAName }) {
  const name = 'this is A name'
  return (
    <div>
      this is A component
      <button onClick={() => onGetAName(name)}>send</button>
    </div>
  )
}

function B({ name }) {
  return (
    <div>
      this is B component, {name}
    </div>
  )
}


function App() {
  const [name, setName] = useState('')

  const getAName = (name) => {
    console.log(name);
    setName(name)
  }

  return (
    <div>
      this is App component
      <A onGetAName={getAName} />
      <B name={name} />
    </div>
  )
}

export default App;