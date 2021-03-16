import "./Clock.css";
import { Component } from "react";

export class Clock extends Component{
  constructor(props){
    super(props);
    this.state = {
      seconds: 0
    }
  }

  render(){
    return (
      <div className=""></div>
    )
  }
}