import "./Clock.css";
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
    this.props.onRef(this);
    this.timerID = setInterval(() => {
      this.tick();
    }, 1000);
  }

  componentWillUnmount() {
    this.stop();
  }

  stop() {
    clearInterval(this.timerID);
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
