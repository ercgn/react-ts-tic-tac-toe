import React, { Component } from 'react';

export type SquareValue = string | null;
interface SquareProps {
  value: SquareValue;
  onClick: () => void;
}

export const Square = ({ value, onClick }: SquareProps) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
