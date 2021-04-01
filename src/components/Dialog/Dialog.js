import * as ReactDOM from "react-dom";
import { Screen } from "../../utils/screen";
import CSS from "./Dialog.module.css";

function DialogCom(props) {
  return (
    <div className={CSS.dialog}>
      <section className={CSS.dialogBox}>
        <div className={CSS.dialogContent}>{props.content}</div>
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
