import { Ref, forwardRef, useImperativeHandle, useRef } from "react";

const Son = forwardRef((_, ref: Ref<object>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const focusHandler = () => {
    inputRef.current?.focus();
  };
  useImperativeHandle(ref, () => {
    return {
      focusHandler,
    };
  });
  return <input type="text" ref={inputRef} />;
});

function App() {
  const sonRef = useRef<HTMLInputElement & { focusHandler: () => void }>(null);
  const focusHandler = () => {
    console.log(sonRef.current);
    sonRef.current?.focusHandler();
  };
  return (
    <div>
      <Son ref={sonRef} />
      <button onClick={focusHandler}>focus</button>
    </div>
  );
}

export default App;
