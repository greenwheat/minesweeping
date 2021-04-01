import CSS from "./Clock.module.css";
import { Component } from "react";
import { NumberBox } from "../NumberBox/NumberBox";

export class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0
    };
  }

  componentDidMount() {
    typeof this.props.onRef === "function" && this.props.onRef(this);
    // this.start();
  }

  componentWillUnmount() {
    this.stop();
  }

  start() {
    this.reset();
    this.play();
  }

  stop(){
    this.pause();
    this.reset();
  }

  pause() {
    clearInterval(this.timerID);
  }

  play(){
    this.timerID = setInterval(() => {
      this.tick();
    }, 1000);
  }

  reset() {
    this.setState({
      seconds: 0
    });
  }

  tick() {
    this.setState({
      seconds: this.state.seconds + 1
    });
  }

  render() {
    return <NumberBox value={this.state.seconds} />;
  }
}
