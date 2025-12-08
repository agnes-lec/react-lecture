import { useReducer, useEffect, useState } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import { tasksReducer, initialTasks } from '../utils/tasksReducer';
import { fetchTasks, createTask, updateTask, deleteTask } from '../services/taskApi';

export default function TaskApp() {
  // 수강생별 ID 설정: .env 파일에서 읽어옴
  const userId = import.meta.env.VITE_USER_ID || '1';
  
  // useReducer로 상태 관리
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 컴포넌트 마운트 시 Task 목록 로드
  useEffect(() => {
    loadTasks();
  }, []);

  /**
   * Task 목록 조회 (GET)
   * API 통신 후 reducer로 상태 업데이트
   */
  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTasks(userId);
      // reducer의 'loaded' action으로 상태 업데이트
      dispatch({ type: 'loaded', tasks: data });
    } catch (err) {
      setError(err.message || 'Failed to load tasks');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const totalCount = tasks.length;
  const completedCount = tasks.filter(t => t.done).length;
  const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  /**
   * Task 생성 (POST)
   * 낙관적 업데이트: reducer로 먼저 추가 → API 호출 → 성공 시 실제 데이터로 교체
   */
  const handleAddTask = async (text) => {
    const tempId = `temp-${Date.now()}`;
    
    // 낙관적 업데이트: reducer로 즉시 추가
    dispatch({
      type: 'added',
      id: tempId,
      text: text,
    });

    try {
      setError(null);
      const newTask = await createTask({ text, done: false }, userId);
      
      // API가 생성된 Task를 반환한 경우
      if (newTask && newTask.id) {
        // 임시 Task를 실제 Task로 교체
        dispatch({ type: 'deleted', id: tempId }); // 임시 제거
        dispatch({
          type: 'added',
          id: newTask.id,
          text: newTask.text,
        });
      } else {
        // API가 응답을 반환하지 않은 경우 목록 새로고침
        await loadTasks();
      }
    } catch (err) {
      // 낙관적 업데이트 롤백: 임시 Task 제거
      dispatch({ type: 'deleted', id: tempId });
      setError(err.message || 'Failed to create task');
      console.error('Error creating task:', err);
    }
  };

  /**
   * Task 수정 (PUT)
   * 낙관적 업데이트: reducer로 먼저 수정 → API 호출 → 실패 시 롤백
   */
  const handleChangeTask = async (task) => {
    const originalTask = tasks.find(t => t.id === task.id);
    
    // 낙관적 업데이트: reducer로 즉시 수정
    dispatch({
      type: 'changed',
      task: task,
    });

    try {
      setError(null);
      const updatedTask = await updateTask(task.id, task, userId);
      
      // 서버 응답으로 UI 업데이트
      dispatch({
        type: 'changed',
        task: updatedTask,
      });
    } catch (err) {
      // 낙관적 업데이트 롤백: 원래 상태로 복구
      if (originalTask) {
        dispatch({
          type: 'changed',
          task: originalTask,
        });
      } else {
        await loadTasks();
      }
      setError(err.message || 'Failed to update task');
      console.error('Error updating task:', err);
    }
  };

  /**
   * Task 삭제 (DELETE)
   * 낙관적 업데이트: reducer로 먼저 삭제 → API 호출 → 실패 시 롤백
   */
  const handleDeleteTask = async (id) => {
    const taskToDelete = tasks.find(t => t.id === id);
    
    // 낙관적 업데이트: reducer로 즉시 삭제
    dispatch({ type: 'deleted', id: id });

    try {
      setError(null);
      await deleteTask(id, userId);
    } catch (err) {
      // 낙관적 업데이트 롤백: 삭제된 Task 복구
      if (taskToDelete) {
        dispatch({
          type: 'added',
          id: taskToDelete.id,
          text: taskToDelete.text,
        });
        // done 상태도 복구해야 하므로 changed action 사용
        dispatch({
          type: 'changed',
          task: taskToDelete,
        });
      } else {
        await loadTasks();
      }
      setError(err.message || 'Failed to delete task');
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Task Dashboard</h1>
          <p className="dashboard-subtitle">React with Reducer Pattern & API Integration</p>
          <p style={{ fontSize: '0.9em', color: '#666', marginTop: '5px' }}>
            User ID: <strong>{userId}</strong>
          </p>
        </header>

        {error && (
          <div className="error-message" style={{ 
            padding: '10px', 
            margin: '10px 0', 
            backgroundColor: '#fee', 
            color: '#c33', 
            borderRadius: '4px' 
          }}>
            <strong>Error:</strong> {error}
            <button 
              onClick={loadTasks}
              style={{ 
                marginLeft: '10px', 
                padding: '4px 8px', 
                cursor: 'pointer',
                backgroundColor: '#c33',
                color: 'white',
                border: 'none',
                borderRadius: '3px'
              }}
            >
              Retry
            </button>
          </div>
        )}

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

        {loading ? (
          <div className="loading-state" style={{ 
            padding: '20px', 
            textAlign: 'center' 
          }}>
            <p>Loading tasks...</p>
          </div>
        ) : tasks.length > 0 ? (
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

