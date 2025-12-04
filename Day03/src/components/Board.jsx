import React from 'react'
import Square from './Square'

export default function Board({ squares, onClick, status }) {

  return (
    <div className="board">
      <div className="player-info">{status}</div>
      <div className="board-grid">
        {squares.map((square, index) => (
          <div key={index}><Square value={square} onClick={() => onClick(index)}/></div>
        ))}
      </div>
    </div>
  )
}

