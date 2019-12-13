import React, { Component } from 'react';

interface SquareProps {
  value: string | null;
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
