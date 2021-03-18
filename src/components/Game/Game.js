import { Component } from "react";
import { Grid } from "../Grid/Grid";

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "easy",
      status: ""
    };
  }

  onRef(ref) {
    this.child = ref;
  }

  reset() {
    this.child.reset();
    this.setState({
      status: ""
    });
  }

  switchMode(mode) {
    this.setState({
      mode
    });
    console.log("current game mode:", mode);
    this.reset();
  }

  onGameEnd(status) {
    this.setState({
      status
    });
  }
  
  render() {
    let status;
    switch (this.state.status) {
      case "success":
        status = "~^o^~";
        break;

      case "fail":
        status = "!T^T!";
        break;
      default:
        status = "+_+";
        break;
    }
    return (
      <div>
        <button
          onClick={() => {
            this.reset();
          }}
        >
          重新开始
        </button>
        <button onClick={() => {this.switchMode("easy")}}>简单</button>
        <button onClick={() => {this.switchMode("normal")}}>普通</button>
        <button onClick={() => {this.switchMode("hard")}}>困难</button>
        <div>{status}</div>
        <Grid
          mode={this.state.mode}
          onRef={this.onRef.bind(this)}
          onGameEnd={status => this.onGameEnd(status)}
        />
      </div>
    );
  }
}
