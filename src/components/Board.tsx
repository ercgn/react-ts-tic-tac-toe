import React, { Component } from 'react';
import { Square, SquareValue } from './Square';

export interface BoardProps {
  squares: SquareValue[];
  onClick: (index: number) => void;
}

export class Board extends Component<BoardProps, {}> {
  private _renderSquare(i: number) {
    const { squares, onClick } = this.props;
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  }

  public render() {
    return (
      <div>
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
