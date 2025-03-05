import React, { useState, useEffect } from 'react';
import Square from '@/components/Square';

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  useEffect(() => {
    if (!isXNext) {
      const computerMove = getBestMove(squares);
      if (computerMove !== null) {
        const newSquares = squares.slice();
        newSquares[computerMove] = 'O';
        setSquares(newSquares);
        setIsXNext(true);
      }
    }
  }, [isXNext, squares]);

  const handleClick = (index) => {
    if (squares[index] || calculateWinner(squares) || !isXNext) return;

    const newSquares = squares.slice();
    newSquares[index] = 'X';
    setSquares(newSquares);
    setIsXNext(false);
  };

  const renderSquare = (index) => (
    <Square value={squares[index]} onClick={() => handleClick(index)} />
  );


  const handleReplay = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = calculateWinner(squares);
  const status = winner ? `Winner: ${winner}` : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div className="status"><h1 className="py-8 text-2xl text-center">{status}</h1></div>

      {winner &&
        <div className="py-10">
            <button className="py-2 px-1.5 bg-emerald-700 rounded-2xl w-full" onClick={handleReplay}>Re Play</button>  
        </div>
      }
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const getBestMove = (squares) => {
  const emptySquares = squares.map((value, index) => (value === null ? index : null)).filter((value) => value !== null);
  return emptySquares.length > 0 ? emptySquares[Math.floor(Math.random() * emptySquares.length)] : null;
};

export default Board;
