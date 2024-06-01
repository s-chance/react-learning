import { useMemo, useState } from "react";

function fib(n: number): number {
  console.log("fib");
  if (n < 3) return 1;
  return fib(n - 1) + fib(n - 2);
}

function App() {
  const [count1, setCount1] = useState(0);

  const result = useMemo(() => {
    return fib(count1);
  }, [count1]);

  const [count2, setCount2] = useState(0);
  console.log("re-rendering");

  return (
    <div>
      <button onClick={() => setCount1(count1 + 1)}>{count1}</button>
      <button onClick={() => setCount2(count2 + 1)}>{count2}</button>
      {result}
    </div>
  );
}

export default App;
