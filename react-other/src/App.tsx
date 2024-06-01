import { memo, useMemo, useState } from "react";

const MemoSon = memo(function Son(props: { props: number | number[] }) {
  console.log("son component,", props.props);
  return <div>this is son</div>;
});

function App() {
  const [count, setCount] = useState(0);

  const [props, setProps] = useState(0);

  const list = useMemo(() => {
    return [1, 2, 3];
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+{count}</button>
      <button onClick={() => setProps(props + 1)}>change props: {props}</button>
      {/* <Son /> */}
      <MemoSon props={100} />
      <MemoSon props={list} />
    </div>
  );
}

export default App;
