import { Component } from "react";
import { Cell } from "./../Cell/Cell";
import { Dialog } from "../Dialog/Dialog";
import "./Grid.css";

const dialog = new Dialog();

const MODES = {
  easy: {
    row: 9,
    column: 9,
    bombCount: 10
  },
  normal: {
    row: 16,
    column: 16,
    bombCount: 40
  },
  hard: {
    row: 16,
    column: 30,
    bombCount: 99
  }
};

export class Grid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "initial",
      bombs: [],
      matrix: [],
      leftBombCount: MODES[props.mode].bombCount
    };
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  getCurIndex(row, col) {
    return row * MODES[this.props.mode].column + col;
  }

  getSum() {
    return MODES[this.props.mode].column * MODES[this.props.mode].row;
  }

  onClickCell(row, col) {
    const status = this.state.status;
    if (status === "success" || status === "fail") {
      return;
    }
    if (status === "initial") {
      this.setState({
        status: "pending"
      });
      this.setBombs(row, col);
      setTimeout(() => {
        const index = this.getCurIndex(row, col);
        this.openCell(index);
      }, 100);
    } else {
      const index = this.getCurIndex(row, col);
      this.openCell(index);
    }
  }

  onRightClickCell(e, row, col) {
    e.preventDefault();
    console.log("right click");
    const curIndex = this.getCurIndex(row, col);
    const matrix = this.state.matrix.slice();
    const curCell = matrix[curIndex];
    if (curCell && !curCell.opened) {
      let leftBombCount = this.state.leftBombCount;
      curCell.flag = !curCell.flag?leftBombCount--:leftBombCount++;
      this.setState({
        matrix,
        leftBombCount
      });
    }
    return false;
  }

  setBombs(row, col) {
    const curIndex = this.getCurIndex(row, col);
    const sum = this.getSum();
    const pool = new Array(sum)
      .fill(0)
      .map((_, i) => i)
      .filter(i => i !== curIndex);
    const bombs = [];

    for (let i = 0; i < MODES[this.props.mode].bombCount; i++) {
      const ranIndex = Math.floor(Math.random() * pool.length);
      const bombIndex = pool.splice(ranIndex, 1)[0];
      bombs.push(bombIndex);
    }

    const matrix = new Array(sum).fill(null).map((_, index) => {
      const hasBomb = bombs.includes(index);
      return { bomb: hasBomb };
    });
    bombs.forEach(bombIndex => {
      const surroundingCells = this.getSurroundingCells(bombIndex);
      surroundingCells.forEach(ele => {
        if (ele !== null && matrix[ele].bomb !== true) {
          matrix[ele].number = matrix[ele].number ? matrix[ele].number + 1 : 1;
        }
      });
    });

    console.log("bomb matrix", matrix);
    this.setState({
      bombs: bombs.sort((a, b) => a - b),
      matrix
    });
  }

  getSurroundingCells(curIndex) {
    const sum = this.getSum();
    const colNum = MODES[this.props.mode].column;
    const left = curIndex % colNum === 0 ? null : curIndex - 1;
    const right = (curIndex + 1) % colNum === 0 ? null : curIndex + 1;
    const up = curIndex - colNum < 0 ? null : curIndex - colNum;
    const down = curIndex + colNum >= sum ? null : curIndex + colNum;
    const leftUp = left !== null && up !== null ? up - 1 : null;
    const rightUp = right !== null && up !== null ? up + 1 : null;
    const leftDown = left !== null && down !== null ? down - 1 : null;
    const rightDown = right !== null && down !== null ? down + 1 : null;

    return [left, right, up, down, leftUp, rightUp, leftDown, rightDown];
  }

  openCell(index) {
    const matrix = this.state.matrix.slice();
    let status = "pending";

    const run = curIndex => {
      const curCell = matrix[curIndex];
      if (!curCell) {
        return;
      }
      const { bomb, number, flag, opened } = curCell;
      if (flag || opened) {
        return;
      } else {
        curCell.opened = true;
        if (!bomb && !number) {
          const surroundingCells = this.getSurroundingCells(curIndex);
          surroundingCells.forEach(i => {
            run(i);
          });
        } else if (bomb) {
          status = "fail";
          this.props.onGameEnd(status);
          dialog.show("Game Over!");
          // alert("Game Over!");
        }
      }
    };

    run(index);

    if (status !== "fail") {
      const unOpenedCells = matrix
        .slice()
        .map((item, i) => {
          if (!item.opened) {
            return i;
          } else {
            return null;
          }
        })
        .filter(item => item !== null);
      if (String(unOpenedCells) === String(this.state.bombs)) {
        status = "success";
        this.props.onGameEnd(status);
        dialog.show("Congratulation!")
        this.setState({
          leftBombCount: 0
        })
        // alert("Congratulation!");
      }
      // console.log("unOpenedCells and bombs", unOpenedCells, this.state.bombs);
    }

    this.setState({
      matrix: matrix,
      status
    });
  }

  renderCell(row, col) {
    const index = this.getCurIndex(row, col);
    const status = this.state.matrix[index] || {};

    return (
      <Cell
        key={index}
        bomb={status.bomb === true}
        number={status.number}
        opened={status.opened}
        flag={status.flag}
        status={this.state.status}
        col={col}
        row={row}
        onClickCell={(row, col) => this.onClickCell(row, col)}
        onRightClick={(e, row, col) => this.onRightClickCell(e, row, col)}
      />
    );
  }

  renderCols(rowNum) {
    const cols = [];
    for (let i = 0; i < MODES[this.props.mode].column; i++) {
      cols.push(this.renderCell(rowNum, i));
    }
    return cols;
  }

  renderRows() {
    const rows = [];
    for (let i = 0; i < MODES[this.props.mode].row; i++) {
      rows.push(
        <div key={i} className="grid-row">
          {this.renderCols(i)}
        </div>
      );
    }
    return rows;
  }

  reset() {
    this.setState({
      matrix: [],
      bombs: [],
      status: "initial",
      leftBombCount: MODES[this.props.mode].bombCount
    });
  }

  render() {
    return (
      <div>
        <div>left bombs: {this.state.leftBombCount}</div>
        <section className="grid">{this.renderRows()}</section>
      </div>
    );
  }
}
