import "./NumberBox.css";

export function NumberBox(props) {
  return (
    <div className="number-box">{props.value}</div>
  )
}