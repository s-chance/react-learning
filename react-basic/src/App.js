import { useState } from 'react';


// 自定义hook
function useToggle() {
  // 可复用的逻辑
  const [value, setValue] = useState(true);

  const toggle = () => setValue(!value);

  // 哪些状态和回调函数需要在外部使用，就返回哪些
  return { value, toggle };
}

function App() {

  const { value, toggle } = useToggle();

  return (
    <div>
      {value && <div>this is div</div>}
      <button onClick={toggle}>toggle</button>
    </div>
  )
}

export default App;