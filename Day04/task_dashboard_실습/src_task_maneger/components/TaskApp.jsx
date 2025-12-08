import { useState } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import { tasksReducer, initialTasks, nextId } from '../utils/tasksReducer';

export default function TaskApp() {
  const [tasks, setTasks] = useState(initialTasks);
  const [nextTaskId, setNextTaskId] = useState(nextId);

  const totalCount = tasks.length;
  const completedCount = tasks.filter(t => t.done).length;
  const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const handleAddTask = (text) => {
    setTasks(tasksReducer(tasks, {
      type: 'added',
      id: nextTaskId,
      text: text,
    }));
    setNextTaskId(nextTaskId + 1);
  };

  const handleChangeTask = (task) => {
    setTasks(tasksReducer(tasks, {
      type: 'changed',
      task: task,
    }));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasksReducer(tasks, {
      type: 'deleted',
      id: id,
    }));
  };

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
          <AddTask onAddTask={handleAddTask} />
        </div>

        {tasks.length > 0 ? (
          <TaskList 
            tasks={tasks}
            onChangeTask={handleChangeTask}
            onDeleteTask={handleDeleteTask}
          />
        ) : (
          <div className="empty-state">
            <p>No tasks yet. Add one above!</p>
          </div>
        )}
      </div>
    </div>
  );
}