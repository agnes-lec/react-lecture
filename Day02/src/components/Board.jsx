import React from 'react'
import Square from './Square'

export default function Board() {

  return (
    <div className="board">
      <div className="player-info">
        다음 플레이어: X
      </div>
      <div className="board-grid">
        <div><Square value={1} onClick={() => {}}/></div>
        <div><Square value={2} onClick={() => {}}/></div>
        <div><Square value={3} onClick={() => {}}/></div>
        <div><Square value={4} onClick={() => {}}/></div>
        <div><Square value={5} onClick={() => {}}/></div>
        <div><Square value={6} onClick={() => {}}/></div>
        <div><Square value={7} onClick={() => {}}/></div>
        <div><Square value={8} onClick={() => {}}/></div>
        <div><Square value={9} onClick={() => {}}/></div>
      </div>
    </div>
  )
}

