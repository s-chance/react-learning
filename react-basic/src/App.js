import { useEffect, useState } from 'react'

function App() {

  const [count, setCount] = useState(0)

  // 没有依赖项 只会在组件挂载和状态更新时执行
  // useEffect(() => {
  //   console.log('副作用函数执行了')
  // })

  // 传入空数组依赖 仅在组件挂载时执行
  // useEffect(() => {
  //   console.log('副作用函数执行了')
  // }, [])
  
  // 传入特定依赖项 仅在组件挂载和依赖项发生变化时执行
  useEffect(() => {
    console.log('副作用函数执行了')
  },[count])
  return (
    <div>
      this is app
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  )
}

export default App;