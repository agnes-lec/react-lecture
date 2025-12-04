import React from 'react'
import Square from './Square'

function Board() {
  /**
   * renderSquare 함수
   * 
   * 역할: 개별 Square 컴포넌트를 생성하는 헬퍼 함수
   * 
   * @param {number} i - Square의 인덱스 (0부터 8까지)
   *                     틱택토 보드는 3x3 그리드이므로 총 9개의 칸이 있음
   *                     인덱스는 다음과 같이 배치됨:
   *                     0 | 1 | 2
   *                     -----------
   *                     3 | 4 | 5
   *                     -----------
   *                     6 | 7 | 8
   * 
   * @returns {JSX.Element} Square 컴포넌트
   * 
   * 현재 상태:
   * - value: null - 아직 클릭되지 않은 상태 (향후 'X' 또는 'O'로 변경됨)
   * - onClick: 빈 함수 - 현재는 아무 동작도 하지 않음
   *                    (향후 게임 로직이 추가되면 실제 클릭 핸들러로 교체됨)
   * 
   * 사용 예시:
   * renderSquare(0) // 왼쪽 상단 칸
   * renderSquare(4) // 중앙 칸
   * renderSquare(8) // 오른쪽 하단 칸
   * 
   * 향후 개선:
   * - value는 squares 배열에서 가져올 예정: value={squares[i]}
   * - onClick은 실제 게임 로직을 처리할 예정: onClick={() => handleClick(i)}
   */
  /**
   * renderSquare 함수 - 순수 JavaScript 버전
   * 
   * JSX 대신 React.createElement를 사용하여 컴포넌트를 생성합니다.
   * 
   * JSX 버전:
   * return <Square value={null} onClick={() => {}} />
   * 
   * JavaScript 버전 (현재):
   * return React.createElement(Square, { value: null, onClick: () => {} })
   * 
   * React.createElement의 파라미터:
   * 1. type: 컴포넌트 타입 (Square 컴포넌트)
   * 2. props: 컴포넌트에 전달할 속성들 (객체 형태)
   * 3. children: 자식 요소들 (현재는 없음)
   */
  const renderSquare = (i) => {
    // React.createElement를 사용하여 Square 컴포넌트 생성
    // 첫 번째 인자: 컴포넌트 타입 (Square)
    // 두 번째 인자: props 객체 (value, onClick)
    // 세 번째 인자: children (없음)
    return React.createElement(
      Square,                    // 컴포넌트 타입
      {                          // props 객체
        value: null,             // 현재 값: null (빈 칸)
        onClick: () => {}        // 현재 클릭 핸들러: 빈 함수 (향후 게임 로직 추가 예정)
      }
    )
  }

  return (
    <div className="board">
      <div className="player-info">
        다음 플레이어: X
      </div>
      <div className="board-grid">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i}>{renderSquare(i)}</div>
        ))}
      </div>
    </div>
  )
}

export default Board

