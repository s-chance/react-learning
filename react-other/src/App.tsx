import { Component } from "react";

class Counter extends Component {
  state = {
    count: 0,
  };
  clickHandler = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    return <button onClick={this.clickHandler}>{this.state.count}</button>;
  }
}

function App() {
  return (
    <div>
      <Counter />
    </div>
  );
}

export default App;
