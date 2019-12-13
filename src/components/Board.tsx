import React, { Component } from 'react';
import { Square } from './Square';

export interface BoardProps {}

export interface BoardState {
  squares: (string | null)[];
  isXNext: boolean;
}

export class Board extends Component<BoardProps, BoardState> {
  private _winningStates: number[][] = [
    [0, 1, 2], // Rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonals
    [2, 4, 6],
  ];

  constructor(props: BoardProps) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      isXNext: true,
    };
  }

  private _calculateWinner(board: (string | null)[]): string | null {
    for (let i = 0; i < this._winningStates.length; i++) {
      const [i1, i2, i3] = this._winningStates[i];
      if (board[i1] && board[i1] === board[i2] && board[i1] === board[i3])
        return board[i1];
    }
    return null;
  }

  private _handleClick(index: number) {
    const { squares, isXNext } = this.state;
    if (squares[index] || this._calculateWinner(squares)) {
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
    const { squares, isXNext } = this.state;
    const winner = this._calculateWinner(squares);
    let status: string;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${isXNext ? 'X' : 'O'}`;
    }

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
