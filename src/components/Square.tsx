import React, { Component } from 'react';

export type SquareValue = string | null;
interface SquareProps {
  value: SquareValue;
  onClick: () => void;
}

export class Square extends Component<SquareProps, {}> {
  public render() {
    const { value, onClick } = this.props;
    return (
      <button className="square" onClick={onClick}>
        {value}
      </button>
    );
  }
}

export default Square;
