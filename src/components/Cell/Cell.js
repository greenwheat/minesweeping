import CSS from "./Cell.module.css";

const NUMBER_COLORS = {
  1: "blue",
  2: "green",
  3: "red",
  4: "orange",
  5: "brown",
  6: "crimson",
  7: "darkorange",
  8: "purple"
};

/**
 * props:
 *    bomb 是否有雷
 *    number 无雷（bomb=false），默认0，取值0-8，0时不展示数字
 *    flag 为true时，展示小旗子，并且不可点
 */
export function Cell(props) {
  // console.log("cell props", props);
  const inner = (() => {
    if (props.flag && !props.opened) {
      return <span className={CSS.flag}>P</span>;
    }
    if (props.bomb) {
      if (props.opened) {
        return <div className={`${CSS.bomb} ${CSS.opened}`}></div>;
      } else if (props.status === "success" || props.status === "fail") {
        return <div className={CSS.bomb}></div>;
      }
      return;
    } else if (props.number && props.opened) {
      return (
        <span style={{ color: NUMBER_COLORS[props.number] }}>
          {props.number}
        </span>
      );
    }
  })();
  return (
    <div
      className={CSS.cell}
      style={{ background: props.opened === true ? "white" : "" }}
      onClick={() => {
        console.log(props.row, props.col);
        props.onClickCell(props.row, props.col);
      }}
      onContextMenu={e => {
        props.onRightClick(e, props.row, props.col);
      }}
    >
      {inner}
    </div>
  );
}
