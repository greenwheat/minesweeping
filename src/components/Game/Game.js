import { Component } from "react";
import { Grid } from "../Grid/Grid";

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "easy"
    };
  }
  onRef(ref) {
    this.child = ref;
  }
  switchMode(mode) {
    this.setState({
      mode
    });
    console.log("current game mode:", mode);
    this.child.reset();
  }
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.child.reset();
          }}
        >
          重新开始
        </button>
        <button onClick={() => this.switchMode("easy")}>简单</button>
        <button onClick={() => this.switchMode("normal")}>普通</button>
        <button onClick={() => this.switchMode("hard")}>困难</button>
        <Grid mode={this.state.mode} onRef={this.onRef.bind(this)} />
      </div>
    );
  }
}
