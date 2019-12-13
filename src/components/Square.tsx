import React, { Component } from 'react';

interface SquareProps {
  value: string | null;
}

interface SquareState {
  currentValue: string | null;
}

export class Square extends Component<SquareProps, SquareState> {
  constructor(props: SquareProps) {
    super(props);
    this.state = {
      currentValue: '',
    };
  }

  public render() {
    const { currentValue } = this.state;
    return (
      <button
        className="square"
        onClick={() => this.setState({ currentValue: 'X' })}
      >
        {currentValue}
      </button>
    );
  }
}

export default Square;
