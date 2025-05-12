import { useState } from 'react';

// Square Component
function Square({ value, onSquareClick }) {
  return (
    <div>
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
    </div>
  );
}

// Board Component
function Board({ xIsNext, squares, onPlay }) {
  <h1>Tic-Tac-Toe</h1>
  const winner = calculateWinner(squares);

  function handleClick(i) {
    if (winner || squares[i]) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const status = winner
    ? 'Winner: ' + winner
    : 'Next player: ' + (xIsNext ? 'X' : 'O');

  return (
    <>
      <div className="status">{status}</div>
      {[0, 3, 6].map((rowStart) => (
        <div className="board-row" key={rowStart}>
          <Square value={squares[rowStart]} onSquareClick={() => handleClick(rowStart)} />
          <Square value={squares[rowStart + 1]} onSquareClick={() => handleClick(rowStart + 1)} />
          <Square value={squares[rowStart + 2]} onSquareClick={() => handleClick(rowStart + 2)} />
        </div>
      ))}
    </>
  );
}

// Game Component
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((_, move) => {
    const description = move
      ? 'Go to move #' + move
      : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// Helper Function: Calculate Winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
