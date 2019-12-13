import React, { Component } from 'react';
import { Square } from './Square';

export interface BoardProps {}

export interface BoardState {
  squares: (string | null)[];
}

export class Board extends Component<BoardProps, BoardState> {
  constructor(props: BoardProps) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  private _renderSquare(i: number) {
    const { squares } = this.state;
    return <Square value={squares[i]} />;
  }

  public render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this._renderSquare(0)}
          {this._renderSquare(1)}
          {this._renderSquare(2)}
        </div>
        <div className="board-row">
          {this._renderSquare(3)}
          {this._renderSquare(4)}
          {this._renderSquare(5)}
        </div>
        <div className="board-row">
          {this._renderSquare(6)}
          {this._renderSquare(7)}
          {this._renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;
