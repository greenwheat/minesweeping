import * as ReactDOM from "react-dom";
import "./Dialog.css";

function DialogCom(props) {
  return (
    <div
      className="dialog"
    >
      <div className="dialog-content">{props.content}</div>
      <button onClick={() => props.onClickOKButton()}>OK</button>
    </div>
  );
}

export class Dialog {
  constructor(opt = {}) {
    this.opt = opt;
  }

  show(msg) {
    const opt = this.opt;
    const element = (
      <DialogCom
        content={msg || opt.content || ""}
        show={true}
        onClickOKButton={()=>this.hide()}
      />
    );

    ReactDOM.render(element, document.getElementById("other"));
  }

  hide() {
    ReactDOM.render(<div></div>, document.getElementById("other"));
  }
}
