/**
 * TaskList 페이지 컴포넌트 (UI 전용)
 * 
 * Task 목록을 보여주고 관리하는 페이지입니다.
 * UI 전용 프로젝트이므로 더미 데이터를 사용합니다.
 * 
 * 실습: API를 연결하여 실제 CRUD 기능을 구현하세요.
 */

import { useState } from 'react';
import './TaskList.css';

// UI 전용: 더미 Task 데이터
// 실습: API에서 실제 데이터를 가져오도록 변경하세요
const DUMMY_TASKS = [
  { id: 1, text: 'React 학습하기', done: false, createdAt: '2024-01-15' },
  { id: 2, text: 'API 연동하기', done: true, createdAt: '2024-01-14' },
  { id: 3, text: '프로젝트 완성하기', done: false, createdAt: '2024-01-13' },
];

function TaskList() {
  // UI 전용: 더미 데이터 사용
  // 실습: useState와 useEffect를 사용하여 API에서 데이터를 가져오도록 변경하세요
  const [tasks, setTasks] = useState(DUMMY_TASKS);
  const [newTaskText, setNewTaskText] = useState('');

  function handleCreateTask(e) {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    
    // UI 전용: 로컬 상태만 업데이트
    // 실습: API를 호출하여 실제 Task를 생성하도록 변경하세요
    const newTask = {
      id: Date.now(),
      text: newTaskText.trim(),
      done: false,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setTasks([newTask, ...tasks]);
    setNewTaskText('');
    alert('실습: API를 연결하여 실제 Task 생성 기능을 구현하세요!');
  }

  function handleToggleTask(task) {
    // UI 전용: 로컬 상태만 업데이트
    // 실습: API를 호출하여 실제 Task를 수정하도록 변경하세요
    setTasks(tasks.map(t => t.id === task.id ? { ...t, done: !t.done } : t));
    alert('실습: API를 연결하여 실제 Task 수정 기능을 구현하세요!');
  }

  function handleDeleteTask(taskId) {
    // UI 전용: 로컬 상태만 업데이트
    // 실습: API를 호출하여 실제 Task를 삭제하도록 변경하세요
    setTasks(tasks.filter(t => t.id !== taskId));
    alert('실습: API를 연결하여 실제 Task 삭제 기능을 구현하세요!');
  }

  const completedCount = tasks.filter(t => t.done).length;
  const totalCount = tasks.length;

  return (
    <div className="task-list">
      <h1>Task 관리</h1>

      <form onSubmit={handleCreateTask} className="task-form">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="새 Task를 입력하세요..."
          className="task-input"
        />
        <button type="submit" className="btn-primary">
          추가
        </button>
      </form>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>등록된 Task가 없습니다.</p>
        </div>
      ) : (
        <>
          <div className="task-stats">
            <span>전체: {totalCount}개</span>
            <span>완료: {completedCount}개</span>
            <span>미완료: {totalCount - completedCount}개</span>
          </div>

          <div className="tasks-container">
            {tasks.map((task) => (
              <div key={task.id} className="task-item">
                <div className="task-content">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => handleToggleTask(task)}
                    className="task-checkbox"
                  />
                  <span className={`task-text ${task.done ? 'completed' : ''}`}>
                    {task.text}
                  </span>
                </div>
                <div className="task-actions">
                  <span className="task-date">
                    {task.createdAt}
                  </span>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="btn-delete"
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default TaskList;

