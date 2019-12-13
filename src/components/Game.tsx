import React, { Component } from 'react';
import { Board } from './Board';

interface GameProps {}

interface GameState {
  history: {
    squares: (string | null)[];
  }[];
  isXNext: boolean;
}

export class Game extends Component<GameProps, GameState> {
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

  constructor(props: GameProps) {
    super(props);

    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      isXNext: true,
    };
  }

  private _handleClick(index: number) {
    const { history, isXNext } = this.state;
    const current = history[history.length - 1];

    if (current.squares[index] || this._calculateWinner(current.squares)) {
      return;
    }

    const squares = current.squares.slice();
    squares[index] = isXNext ? 'X' : 'O';
    this.setState({
      history: [...history, { squares: squares }],
      isXNext: !isXNext,
    });
  }

  private _calculateWinner(board: (string | null)[]): string | null {
    if (!board.some(e => e === null)) {
      return 'TIE';
    }

    for (let i = 0; i < this._winningStates.length; i++) {
      const [i1, i2, i3] = this._winningStates[i];
      if (board[i1] && board[i1] === board[i2] && board[i1] === board[i3])
        return board[i1];
    }
    return null;
  }

  public render() {
    const { history, isXNext } = this.state;
    const current = history[history.length - 1];
    const winner = this._calculateWinner(current.squares);
    let status: string;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${isXNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i: number) => this._handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
