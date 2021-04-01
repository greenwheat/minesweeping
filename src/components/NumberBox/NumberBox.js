import CSS from "./NumberBox.module.css";

export function NumberBox(props) {
  return (
    <div className={CSS.numberBox}>{props.value}</div>
  )
}