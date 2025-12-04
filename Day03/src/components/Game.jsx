import React, { useState } from 'react'
import Board from './Board'

export default function Game() {

  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  const handleClick = (i) => {
    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? 'X' : 'O'
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }

  const handleRestart = () => {
    setSquares(Array(9).fill(null))
    setXIsNext(true)
  }

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],  // 첫 번째 가로줄 (상단)
      [3, 4, 5],  // 두 번째 가로줄 (중간)
      [6, 7, 8],  // 세 번째 가로줄 (하단)
      [0, 3, 6],  // 첫 번째 세로줄 (왼쪽)
      [1, 4, 7],  // 두 번째 세로줄 (중간)
      [2, 5, 8],  // 세 번째 세로줄 (오른쪽)
      [0, 4, 8],  // 대각선 (왼쪽 위 → 오른쪽 아래)
      [2, 4, 6],  // 대각선 (오른쪽 위 → 왼쪽 아래)
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const winner = calculateWinner(squares)
  let status

  if (winner) {
    status = `${winner}님이 승리하였습니다.`
  } else {
    if (squares.every(square => square !== null)) {
      status = '무승부입니다.'
    } else {  
      status = `${xIsNext ? 'X' : 'O'}님의 턴입니다.`
    }
  }

  return (
    <div className="game">
      <div className="game-container">
        <Board squares={squares} onClick={handleClick} status={status} />
        <button onClick={handleRestart} className="restart-button">
          게임 재시작
        </button>
      </div>
    </div>
  )
}

