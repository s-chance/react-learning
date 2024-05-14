// 父传子
// 1. 父组件传递数据 子组件传递
// 2. 子组件接收数据 props的参数

function Son(props) {
  // props对象里面包含了父组件传递过来的所有数据
  console.log(props);
  // { name: '父组件中的数据'}
  return <div>this is son, {props.name}, {props.children}</div>
}

function App() {
  const name = 'this is app name'
  return (
    <div>
      <Son name={name}
        number={12}
        string={'string'}
        boolean={true}
        array={['react', 'vue']}
        obj={{ name: 'obj' }}
        func={() => { console.log('func') }}
        jsx={<div>jsx</div>}
      >
        <span>this is span</span>
      </Son>
    </div>
  )
}

export default App;