import AddTask from './AddTask';
import TaskList from './TaskList';

export default function TaskApp() {
  // 실습용 더미 데이터 (로직 제거, HTML 구조만 유지)
  const progress = 50;
  const totalCount = 4;
  const completedCount = 2;
  const tasks = []; // 빈 배열로 설정하여 empty-state를 보여줌

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Task Dashboard</h1>
          <p className="dashboard-subtitle">React State Management with Reducer Pattern</p>
        </header>

        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-label">Progress</span>
            <span className="progress-percentage">{progress}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="progress-stats">
            <span>Total: <strong>{totalCount}</strong></span>
            <span>Done: <strong>{completedCount}</strong></span>
          </div>
        </div>

        <div className="input-section">
          <AddTask />
        </div>

        <TaskList />
      </div>
    </div>
  );
}