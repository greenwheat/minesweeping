import * as ReactDOM from "react-dom";
import { Screen } from "../../utils/screen";
import "./Dialog.css";

function DialogCom(props) {
  return (
    <div className="dialog">
      <section className="dialog-box">
        <div className="dialog-content">{props.content}</div>
        <button onClick={() => props.onClickOKButton()}>OK</button>
      </section>
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
        onClickOKButton={() => this.hide()}
      />
    );

    ReactDOM.render(element, document.getElementById("other"));
    Screen.lock();
  }

  hide() {
    ReactDOM.render(<div></div>, document.getElementById("other"));
    Screen.unlock();
  }
}
