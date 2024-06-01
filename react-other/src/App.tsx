import { Component, ReactNode, useState } from "react";

class Son extends Component {
  timer: NodeJS.Timeout | null = null;
  componentDidMount(): void {
    console.log("son componentDidMount");
    this.timer = setInterval(() => {
      console.log("timer running");
    }, 1000);
  }
  componentWillUnmount(): void {
    console.log("son componentWillUnmount");
    clearInterval(this.timer!);
  }
  render(): ReactNode {
    return <div>son</div>;
  }
}

function App() {
  const [show, setShow] = useState(true);
  return (
    <div>
      <button onClick={() => setShow(!show)}>toggle</button>
      {show && <Son />}
    </div>
  );
}

export default App;
