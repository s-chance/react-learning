import { memo, useState } from "react";

const MemoSon = memo(function Son(props: { props: number }) {
  console.log("son component,", props.props);
  return <div>this is son</div>;
});

function App() {
  const [count, setCount] = useState(0);

  const [props, setProps] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+{count}</button>
      <button onClick={() => setProps(props + 1)}>change props: {props}</button>
      {/* <Son /> */}
      <MemoSon props={props} />
    </div>
  );
}

export default App;
