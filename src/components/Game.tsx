import React, { Component } from 'react';
import { Board } from './Board';
import { SquareValue } from './Square';

interface HistoryItem {
  squares: SquareValue[];
}

interface GameProps {}

interface GameState {
  history: HistoryItem[];
  isXNext: boolean;
  stepNumber: number;
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
      stepNumber: 0,
    };
  }

  private _handleClick(index: number) {
    const { isXNext, stepNumber } = this.state;
    const history = this.state.history.slice(0, stepNumber + 1);
    const current = history[history.length - 1];

    if (current.squares[index] || this._calculateWinner(current.squares)) {
      return;
    }

    const squares = current.squares.slice();
    squares[index] = isXNext ? 'X' : 'O';
    this.setState({
      history: [...history, { squares: squares }],
      stepNumber: history.length++,
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

  private _getCurrentHistory(): HistoryItem {
    const { history, stepNumber } = this.state;
    return history[stepNumber];
  }

  private _jumpTo(step: number): void {
    this.setState({
      stepNumber: step,
      isXNext: step % 2 === 0,
    });
  }

  private _renderStatus(): string {
    const { isXNext } = this.state;
    const current = this._getCurrentHistory();
    const winner = this._calculateWinner(current.squares);
    let status: string;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${isXNext ? 'X' : 'O'}`;
    }
    return status;
  }

  private _renderMovesHistory() {
    const { history } = this.state;

    return history.map((step: HistoryItem, move: number) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this._jumpTo(move)}>{desc}</button>
        </li>
      );
    });
  }

  public render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this._getCurrentHistory().squares}
            onClick={(i: number) => this._handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{this._renderStatus()}</div>
          <ol>{this._renderMovesHistory()}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
