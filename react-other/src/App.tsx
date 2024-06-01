import { useReducer } from "react";

function reducer(state: number, action: { type: string; payload?: number }) {
  switch (action.type) {
    case "INC":
      return state + 1;
    case "DEC":
      return state - 1;
    case "SET":
      if (!action.payload) {
        throw new Error("payload is required");
      }
      return action.payload;
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, 0);
  return (
    <div>
      <button onClick={() => dispatch({ type: "INC" })}>+</button>
      {state}
      <button onClick={() => dispatch({ type: "DEC" })}>-</button>
      <button onClick={() => dispatch({ type: "SET", payload: 100 })}>
        update
      </button>
    </div>
  );
}

export default App;
