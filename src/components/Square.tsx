import React, { Component } from 'react';

export interface SquareProps {
  value: number;
}

export class Square extends Component<SquareProps, {}> {
  public render() {
    const { value } = this.props;
    return <button className="square">{value}</button>;
  }
}

export default Square;
