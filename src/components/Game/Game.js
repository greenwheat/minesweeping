import { Component } from "react";
import { Grid } from "../Grid/Grid";
import { Clock } from "../Clock/Clock";
import CSS from "./Game.module.css";
export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "easy",
      status: ""
    };
  }

  onGridRef(ref) {
    this.childGrid = ref;
  }

  onClockRef(ref) {
    this.childClock = ref;
  }

  onOpenFirstCell() {
    this.childClock.start();
  }

  reset() {
    this.childGrid.reset();
    this.childClock.reset();
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
    this.childClock.pause();
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
        <button
          onClick={() => {
            this.switchMode("easy");
          }}
        >
          简单
        </button>
        <button
          onClick={() => {
            this.switchMode("normal");
          }}
        >
          普通
        </button>
        <button
          onClick={() => {
            this.switchMode("hard");
          }}
        >
          困难
        </button>

        <section className={CSS.statusArea}>
          <Clock onRef={this.onClockRef.bind(this)} />
          <div>{status}</div>
        </section>

        <Grid
          mode={this.state.mode}
          onRef={this.onGridRef.bind(this)}
          onGameEnd={status => this.onGameEnd(status)}
          onOpenFirstCell={() => this.onOpenFirstCell()}
        />
      </div>
    );
  }
}
