import React, { Component } from 'react';
import { Square } from './Square';

export interface BoardProps {}

export interface BoardState {
  squares: (string | null)[];
  isXNext: boolean;
}

export class Board extends Component<BoardProps, BoardState> {
  constructor(props: BoardProps) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      isXNext: true,
    };
  }

  private _handleClick(index: number) {
    const { squares, isXNext } = this.state;
    if (squares[index]) {
      // Cell already has a value!
      return;
    }

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';
    this.setState({
      squares: newSquares,
      isXNext: !isXNext,
    });
  }

  private _renderSquare(i: number) {
    const { squares } = this.state;
    return <Square value={squares[i]} onClick={() => this._handleClick(i)} />;
  }

  public render() {
    const { isXNext } = this.state;
    const status = `Next player: ${isXNext ? 'X' : 'O'}`;

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
