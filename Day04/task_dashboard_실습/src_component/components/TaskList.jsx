import Task from './Task';

// ==========================================
// Task List Component
// ==========================================

export default function TaskList() {
  // 실습용 더미 데이터
  const dummyTasks = [
    { id: 1, text: 'Sample Task 1', done: false },
    { id: 2, text: 'Sample Task 2', done: true },
    { id: 3, text: 'Sample Task 3', done: false },
  ];

  return (
    <ul className="task-list">
        <li>
          <Task />
        </li>
        <li>
          <Task />
        </li>
        <li>
          <Task />
        </li>
    </ul>
  );
}

