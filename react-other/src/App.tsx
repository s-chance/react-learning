import { memo, useCallback, useState } from "react";

type onChangeType = { onChange: (value: string) => void };

const Input = memo(function Input({ onChange }: onChangeType) {
  console.log("Input render");
  return <input type="text" onChange={(e) => onChange(e.target.value)} />;
});

function App() {
  const changeHandler = useCallback((value: string) => console.log(value), []);
  const [count, setCount] = useState(0);
  return (
    <div>
      <Input onChange={changeHandler} />
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  );
}

export default App;
