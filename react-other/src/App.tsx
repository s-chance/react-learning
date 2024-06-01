import { Component, ReactNode } from "react";

interface SonProps {
  msg?: string;
  onGetMsg?: (msg: string) => void;
}

class Son extends Component<SonProps> {
  render(): ReactNode {
    return (
      <div>
        <div>son,{this.props.msg}</div>
        <button
          onClick={() => {
            this.props.onGetMsg?.("son message");
          }}
        >
          send msg to parent
        </button>
      </div>
    );
  }
}

class Parent extends Component {
  state = {
    msg: "parent message",
  };

  getSonMsg = (sonMsg: string) => {
    console.log(sonMsg);
  };
  render(): ReactNode {
    return (
      <div>
        parent<Son msg={this.state.msg} onGetMsg={this.getSonMsg} />
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <Parent />
    </div>
  );
}

export default App;
